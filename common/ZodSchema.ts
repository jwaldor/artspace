import { z } from "zod";
import { apiBuilder, makeApi } from "@zodios/core";

export const postSchema = z.object({
  id: z.number(),
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
    // z.object({
    //   type: z.literal("ThreeBody"),
    //   parameters: z.object({
    //     bodies: z.number(),
    //   }),
    // }),
    z.object({
      type: z.literal("Conway"),
      parameters: z.object({
        live: z.array(z.array(z.boolean())),
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
    method: "post",
    path: "/createPost",
    parameters: [{ name: "post", type: "Body", schema: newPostSchema }],
    // body: newPostSchema,
    response: z.void(),
  },
  {
    method: "get",
    path: "/",
    response: z.string(),
  },
]);

// Define a schema for the request headers and body
// export const authRequestSchema = z.object({
//   headers: z.object({
//     authorization: z.string().optional(),
//   }),
//   body: z.object({
//     // Define expected body properties if any
//   }),
// });

// // Define a schema for the response
// export const authResponseSchema = z.object({
//   status: z.number(),
//   json: z
//     .function()
//     .args(
//       z.object({
//         error: z.string().optional(),
//       })
//     )
//     .returns(z.void()),
// });
