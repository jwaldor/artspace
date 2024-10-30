import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { DBService } from "./services/databaseservices";
import { clerkMiddleware, getAuth, requireAuth } from "@clerk/express";
import { zodiosApp, ZodiosRequestHandler } from "@zodios/express";
import { postApi } from "./ZodSchema";
import { PostArtformType } from "./express";
import { z } from "zod";
import { newPostSchema } from "./ZodSchema";
import { clerkClient } from "@clerk/express";
import { User } from "@prisma/client";
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

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Validate request using authRequestSchema
  // const parsedRequest = authRequestSchema.safeParse(req);
  // if (!parsedRequest.success) {
  //   res.status(400).json({ error: "Invalid request format" });
  //   return;
  // }

  console.log("Request here:", {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
  });
  next();
};

const attachUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

// const requireAuthVar = ;

app.post(
  "/createPost",
  loggerMiddleware as ZodiosRequestHandler<
    typeof postApi,
    any,
    "post",
    "/createPost"
  >,
  requireAuth() as ZodiosRequestHandler<
    typeof postApi,
    any,
    "post",
    "/createPost"
  >,
  attachUserMiddleware as ZodiosRequestHandler<
    typeof postApi,
    any,
    "post",
    "/createPost"
  >,
  async (req, res) => {
    // Use the inferred type for the request body
    const { artform }: NewPost = req.body;
    console.log("name, parameters, artform", artform);
    console.log("creating post");
    const user = req.user;
    if (!user) {
      console.error("user id not found");
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

app.post(
  "/toggleLikePost",
  loggerMiddleware as ZodiosRequestHandler<
    typeof postApi,
    any,
    "post",
    "/toggleLikePost"
  >,
  requireAuth() as ZodiosRequestHandler<
    typeof postApi,
    any,
    "post",
    "/toggleLikePost"
  >,
  attachUserMiddleware as ZodiosRequestHandler<
    typeof postApi,
    any,
    "post",
    "/toggleLikePost"
  >,
  async (req, res) => {
    console.log("toggle like post");
    const { postId } = req.body;
    const user = req.user;
    if (!user) {
      console.error("user id not found");
      res.status(401).json({ error: "Unauthorized" } as any);
      return;
    }
    const like = await prisma.like.findFirst({
      where: { artPieceId: postId, userId: user.id },
    });
    if (like) {
      await prisma.like.delete({ where: { id: like.id } });
    } else {
      await prisma.like.create({
        data: { artPieceId: postId, userId: user.id },
      });
    }
    console.log("postId", postId);
    res.json({ success: true });
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
      likes: { include: { user: { select: { id: true, name: true } } } },
      createdBy: true, // Add this line to include user data
    },
  });
  const postsWithLikes = posts.map((post) => ({
    ...post,
    likes: post.likes.map((like) => ({
      id: like.user.id,
      name: like.user.name,
    })),
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
