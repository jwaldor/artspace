import { z } from "zod";

export const postSchema = z.object({
  id: z.string(),
  name: z.string(),
  likes: z.number(),
  updatedAt: z.coerce.date(),
  creator: z.string(),
  artform: z.object({
    type: z.literal("Shiba"),
    parameters: z.object({
      fog: z.number(),
    }),
  }),
});


type PostType = z.infer<typeof postSchema>;