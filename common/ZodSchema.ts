import { z } from "zod";

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
