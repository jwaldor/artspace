import { ArtClient } from "./artClient";

export type ShibaParameters = { fog: number };

export type ArtForms = "Shiba";
export const defaultArtForm: ArtForms = "Shiba";

export type ArtForm =
  | { type: "Shiba"; parameters: ShibaParameters }
  | { type: "Other"; parameters: { other: number } };

export type PostType = {
  id: string;
  name: string;
  likes: number;
  updatedAt: Date;
  creator: string;
  artform: ArtForm;
};

export type ArtFormType = PostType["artform"]["type"];
export type ArtFormParameters = PostType["artform"]["parameters"];

export type InProgressPostType = {
  name: string;
  artform: ArtForm;
};

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

async function getNewPosts() {
  const artClient = new ArtClient();
  const newPosts = await artClient.getPosts(); // this is a side effect, because it's a network call
  return newPosts;
}

export const initialPosts: PostType[] = [
  {
    id: "1",
    name: "Post 1",
    likes: 0,
    updatedAt: new Date(),
    creator: "User 1",
    artform: { type: "Shiba", parameters: { fog: 1 } },
  },
];

export const initialInProgressPost: InProgressPostType = {
  name: "",
  artform: { type: "Shiba", parameters: { fog: 20 } },
};
