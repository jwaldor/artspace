import express, { Request, RequestHandler } from "express";
import cors from "cors";
import { PrismaClient, User } from "@prisma/client";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { DBService } from "./services/databaseservices";
import { clerkMiddleware, getAuth, requireAuth } from "@clerk/express";
import { zodiosApp, ZodiosRequestHandler } from "@zodios/express";
import { postApi } from "../common/ZodSchema";
import { PostArtformType } from "./express";
import { z } from "zod";
import { newPostSchema } from "../common/ZodSchema";
import { clerkClient } from "@clerk/express";

// import { authRequestSchema, authResponseSchema } from "../common/ZodSchema";

const prisma = new PrismaClient();
const app = zodiosApp(postApi);

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

const loggerMiddleware = (req, res, next) => {
  // Validate request using authRequestSchema
  // const parsedRequest = authRequestSchema.safeParse(req);
  // if (!parsedRequest.success) {
  //   res.status(400).json({ error: "Invalid request format" });
  //   return;
  // }

  console.log("Request:", {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
  });
  next();
};

const attachUserMiddleware = async (req, res, next) => {
  console.log("authAndUserMiddleware");
  const auth = getAuth(req);
  const clerkUser = auth.userId;
  console.log("clerkUser", clerkUser);
  if (!clerkUser) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const response = await clerkClient.users.getUser(clerkUser);
  console.log("response", response.username);
  if (typeof response.username !== "string") {
    console.error("Bad request: No username provided");
    res.status(400).json({ error: "Bad request: No username provided" });
    return;
  }
  const user: User | null = await dbService.getUser(clerkUser);
  req.user = user || (await dbService.createUser(clerkUser, response.username));
  // Validate response using authResponseSchema
  // const parsedResponse = authResponseSchema.safeParse(res);
  // if (!parsedResponse.success) {
  //   res.status(500).json({ error: "Invalid response format" });
  //   return;
  // }
  next();
};

// const authAndUserMiddleware = [
//   loggerMiddleware,
//   requireAuth(),
//   attachUserMiddleware,
// ];
// Define a new middleware function

app.get("/", (req, res) => {
  console.log("get");
  res.send("Hello World");
  return;
});

// Define the type from the Zod schema
type NewPost = z.infer<typeof newPostSchema>;

const requireAuthVar = requireAuth();

app.post(
  "/createPost",
  loggerMiddleware,
  requireAuthVar as ZodiosRequestHandler<
    typeof postApi,
    any,
    "post",
    "/createPost"
  >,
  attachUserMiddleware,
  async (req, res) => {
    // Use the inferred type for the request body
    const { artform }: NewPost = req.body;
    console.log("name, parameters, artform", artform);
    console.log("creating post");
    const user = req.user;
    if (!user) {
      res.status(401).json({ error: "Unauthorized" } as any);
      return;
    }
    const post = await prisma.artPiece.create({
      data: {
        parameters: JSON.stringify(artform.parameters),
        form: artform.type,
        createdBy: { connect: { id: user.id } },
      },
    });
    res.status(200);
    return;
  }
);

// app.get("/users", async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.json(users);
//   return;
// });

app.get("/allPosts", async (req, res) => {
  const posts = await prisma.artPiece.findMany({
    include: {
      _count: {
        select: {
          likes: true,
        },
      },
      createdBy: true, // Add this line to include user data
    },
  });
  const postsWithLikes = posts.map((post) => ({
    ...post,
    likes: post._count.likes,
    createdByName: post.createdBy.name, // Add this line
    artform: {
      type: post.form as PostArtformType,
      parameters: JSON.parse(String(post.parameters)),
    },
  }));
  console.log("postsWithLikes", postsWithLikes);
  res.json(postsWithLikes);
  return;
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
