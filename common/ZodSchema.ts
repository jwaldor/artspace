import { z } from "zod";
import { apiBuilder, makeApi } from "@zodios/core";

export const postSchema = z.object({
  id: z.number(),
  name: z.string(),
  likes: z.number(),
  updatedAt: z.coerce.date(),
  createdById: z.string(),
  // createdByName: z.string(),
  artform: z.union([
    z.object({
      type: z.literal("Shiba"),
      parameters: z.object({
        fog: z.number(),
      }),
    }),
    z.object({
      type: z.literal("Other"),
      parameters: z.object({
        other: z.number(),
      }),
    }),
  ]),
});

export const newPostSchema = z.object({
  artform: postSchema.shape.artform,
});

export const postApi = makeApi([
  {
    method: "get",
    path: "/allPosts",
    response: z.array(postSchema),
  },
  {
    method: "get",
    path: "/createPost",
    body: newPostSchema,
    response: z.void(),
  },
]);
