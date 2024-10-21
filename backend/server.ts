import express, { Request } from "express";
import cors from "cors";
import { PrismaClient, User } from "@prisma/client";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { DBService } from "./services/databaseservices";
import { clerkMiddleware, getAuth, requireAuth } from "@clerk/express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.use(cors());
app.use(clerkMiddleware());

const dbService = DBService();

interface UserRequest extends Request {
  user: User;
}

const authAndUserMiddleware = [
  requireAuth(),
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const auth = getAuth(req);
    const clerkUser = auth.userId;
    if (!clerkUser) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const user: User | null = await dbService.getUser(clerkUser);
    req.user = user || (await dbService.createUser(clerkUser));
    // console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  },
];
// Define a new middleware function

app.post(
  "/createPost",
  authAndUserMiddleware,
  async (req: UserRequest, res) => {
    const { name, parameters, form, createdById } = req.body;
    const user = req.user;
    const post = await prisma.artPiece.create({
      data: {
        name,
        parameters,
        form,
        createdBy: { connect: { id: user.id } },
      },
    });
    res.json(post);
  }
);

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
