import { postSchema, newPostSchema } from "../../../common/ZodSchema";
import { z } from "zod";
import { ArtClient } from "./artClient";
import { createContext } from "react";

console.log(postSchema.shape, newPostSchema.shape);

const pulsar = [
  [
    false,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    true,
    true,
    false,
    false,
  ],
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
  [
    true,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    true,
  ],
  [
    true,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    true,
  ],
  [
    true,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    true,
  ],
  [
    false,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    true,
    true,
    false,
    false,
  ],
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
  [
    false,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    true,
    true,
    false,
    false,
  ],
  [
    true,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    true,
  ],
  [
    true,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    true,
  ],
  [
    true,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    true,
  ],
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
  [
    false,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    true,
    true,
    false,
    false,
  ],
];

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
        live: pulsar,
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

export const initialPosts: PostType[] = [];

export const initialInProgressPost: InProgressPostType =
  artFormDefaults[defaultArtForm];

type ArtContextType = {
  client: ArtClient;
  posts: PostType[];
  inProgressPost: InProgressPostType;
  setInProgressPost: React.Dispatch<React.SetStateAction<InProgressPostType>>;
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
};

export const ArtContext = createContext<ArtContextType>({
  client: new ArtClient(),
  posts: initialPosts,
  inProgressPost: initialInProgressPost,
  setInProgressPost: () => {},
  setPosts: () => {},
});
