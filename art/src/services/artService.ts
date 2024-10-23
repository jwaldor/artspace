import { postSchema, newPostSchema } from "../../../common/ZodSchema";
import { z } from "zod";

console.log(postSchema.shape, newPostSchema.shape);
export type ShibaParameters = { fog: number };

export type ArtForms = "Shiba";
export const defaultArtForm: ArtForms = "Shiba";

export type ArtForm = z.infer<typeof postSchema>["artform"];

export type PostType = z.infer<typeof postSchema>;

export type ArtFormType = PostType["artform"]["type"];
export type ArtFormParameters = PostType["artform"]["parameters"];

export type InProgressPostType = z.infer<typeof newPostSchema>;

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
    ...inProgressPost,
    artform: { ...inProgressPost.artform, parameters: params } as T,
  };
}

// async function getNewPosts() {
//   const artClient = new ArtClient();
//   const newPosts = await artClient.getPosts(); // this is a side effect, because it's a network call
//   return newPosts;
// }

export const initialPosts: PostType[] = [
  {
    id: 0,
    name: "Post 1",
    likes: 0,
    updatedAt: new Date(),
    createdById: "User 1",
    // createdByName: "User 1",
    artform: { type: "Shiba", parameters: { fog: 1 } },
  },
];

export const initialInProgressPost: InProgressPostType = {
  artform: { type: "Shiba", parameters: { fog: 20 } },
};
