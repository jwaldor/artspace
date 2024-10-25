import { postSchema, newPostSchema } from "../../../common/ZodSchema";
import { z } from "zod";

console.log(postSchema.shape, newPostSchema.shape);
export type ShibaParameters = Extract<
  z.infer<typeof postSchema>["artform"],
  { type: "Shiba" }
>["parameters"];

export type ArtForms = z.infer<typeof postSchema>["artform"]["type"];
export const defaultArtForm: ArtForms = "Shiba";

export type ArtForm = z.infer<typeof postSchema>["artform"];

export type PostType = z.infer<typeof postSchema>;

export type ArtFormType = PostType["artform"]["type"];
export type ArtFormParameters = PostType["artform"]["parameters"];

export type InProgressPostType = z.infer<typeof newPostSchema>;

export const artFormDefaults: {
  [K in ArtFormType]: InProgressPostType & {
    artform: Extract<ArtForm, { type: K }>;
  };
} = {
  Shiba: {
    artform: {
      type: "Shiba",
      parameters: {
        fog: 10,
      },
    },
  },
  Conway: {
    artform: {
      type: "Conway",
      parameters: {
        live: Array(13).fill(Array(13).fill(false)),
      },
    },
  },
};

// export const postSchema = z.object({
//   id: z.number(),
//   name: z.string(),
//   likes: z.number(),
//   updatedAt: z.coerce.date(),
//   createdById: z.string(),
//   // createdByName: z.string(),
//   artform: z.union([
//     z.object({
//       type: z.literal("Shiba"),
//       parameters: z.object({
//         fog: z.number(),
//       }),
//     }),
//     z.object({
//       type: z.literal("Other"),
//       parameters: z.object({
//         other: z.number(),
//       }),
//     }),
//   ]),
// });

// export const newPostSchema = z.object({
//   artform: postSchema.shape.artform,
// });

// getters
// setters
// calculations
// filtering
// sorting
// mapping

// things to test: does this ever create side effects? Does it every mutate.
export function updateParameters<T extends ArtForm>(
  inProgressPost: InProgressPostType,
  params: T["parameters"]
): InProgressPostType {
  return {
    artform: { ...inProgressPost.artform, parameters: params } as T,
  };
}

export const initialPosts: PostType[] = [
  {
    id: 0,
    likes: 0,
    updatedAt: new Date(),
    createdById: "User 1",
    artform: { type: "Shiba", parameters: { fog: 1 } },
  },
];

export const initialInProgressPost: InProgressPostType = {
  artform: { type: "Shiba", parameters: { fog: 20 } },
};
