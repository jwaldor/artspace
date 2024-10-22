import express, { Request } from "express";
import cors from "cors";
import { PrismaClient, User } from "@prisma/client";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { DBService } from "./services/databaseservices";
import { clerkMiddleware, getAuth, requireAuth } from "@clerk/express";

const prisma = new PrismaClient();
const app = express();

// app.use((req, res, next) => {
//   console.log(
//     "Full Request:",
//     JSON.stringify(
//       {
//         ...req,
//         // Exclude non-enumerable properties and functions
//         socket: undefined,
//         connection: undefined,
//         app: undefined,
//         res: undefined,
//         next: undefined,
//       },
//       (key, value) => {
//         if (typeof value === "function") {
//           return "[Function]";
//         }
//         return value;
//       },
//       2
//     )
//   );
//   next();
// });

app.use(express.json());

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(clerkMiddleware());

const dbService = DBService();

interface UserRequest extends Request {
  user: User;
}

const authAndUserMiddleware = [
  (req, res, next) => {
    console.log("Request:", {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
    });
    next();
  },
  requireAuth(),
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log("authAndUserMiddleware");
    const auth = getAuth(req);
    const clerkUser = auth.userId;
    console.log("clerkUser", clerkUser);
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

app.get("/", (req, res) => {
  console.log("get");
  res.send("Hello World");
  return;
});

app.post(
  "/createPost",
  authAndUserMiddleware,
  async (req: UserRequest, res) => {
    console.log("createPost", req.body);
    console.log("Request Body:", req.body);
    const { name, artform } = req.body;
    console.log("name, parameters, artform", name, artform);
    const user = req.user;
    const post = await prisma.artPiece.create({
      data: {
        name,
        parameters: JSON.stringify(artform.parameters),
        form: artform.type,
        createdBy: { connect: { id: user.id } },
      },
    });
    res.json(post);
    return;
  }
);

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
  return;
});

app.get("/allPosts", async (req, res) => {
  const posts = await prisma.artPiece.findMany();
  res.json(posts);
  return;
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
