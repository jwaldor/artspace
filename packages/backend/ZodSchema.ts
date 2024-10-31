import { z } from "zod";
import { apiBuilder, makeApi } from "@zodios/core";

export const postSchema = z.object({
  id: z.number(),
  likes: z.array(z.object({ id: z.string(), name: z.string() })),
  updatedAt: z.coerce.date(),
  createdById: z.string(),
  createdByName: z.string(),
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
    z.object({
      type: z.literal("Canvas"),
      parameters: z.object({
        users: z.array(
          z.object({
            userId: z.string(),
            lines: z.array(
              z.array(
                z.object({
                  x: z.number(),
                  y: z.number(),
                  color: z.string(),
                  width: z.number(),
                })
              )
            ),
          })
        ),
      }),
    }),
  ]),
});

export const newPostSchema = z.object({
  artform: postSchema.shape.artform,
});
export const likeSchema = z.object({ postId: z.number() });
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
    method: "post",
    path: "/toggleLikePost",
    parameters: [
      {
        name: "postUser",
        type: "Body",
        schema: likeSchema,
      },
    ],
    // body: newPostSchema,
    response: z.object({ success: z.boolean() }),
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
