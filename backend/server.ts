import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { DBService } from "./services/databaseservices";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.use(cors());

const dbService = DBService();

const authAndUserMiddleware = [
  ClerkExpressRequireAuth(),
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const clerkUser = req.auth.userId;
    const user = await dbService.userExists(clerkUser);
    if (!user) {
      const newUser = await dbService.createUser(clerkUser);
      console.log(newUser);
      req.body.createdById = newUser.id;
    }
    // console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  },
];
// Define a new middleware function

app.post("/createPost", authAndUserMiddleware, async (req, res) => {
  const { name, parameters, form, createdById } = req.body;
  const post = await prisma.artPiece.create({
    data: {
      name,
      parameters,
      form,
      createdById,
    },
  });
  res.json(post);
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
