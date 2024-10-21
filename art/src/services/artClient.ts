// import { z } from "zod";
// import { PostType, ArtForm } from "./artService";

// // Generic API client
// class ApiClient {
//   private baseUrl: string;

//   constructor(baseUrl: string) {
//     this.baseUrl = baseUrl;
//   }

//   private async request<T>(
//     endpoint: string,
//     method: "GET" | "POST" | "PUT" | "DELETE",
//     schema: z.ZodType<T>,
//     body?: unknown
//   ): Promise<T> {
//     try {
//       const response = await fetch(`${this.baseUrl}${endpoint}`, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: body ? JSON.stringify(body) : undefined,
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       return schema.parse(data);
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         console.error("Validation error:", error.errors);
//       } else if (error instanceof Error) {
//         console.error("Request error:", error.message);
//       } else {
//         console.error("Unknown error:", error);
//       }
//       throw error;
//     }
//   }

//   protected get<T>(endpoint: string, schema: z.ZodType<T>): Promise<T> {
//     return this.request(endpoint, "GET", schema);
//   }

//   protected post<T>(
//     endpoint: string,
//     schema: z.ZodType<T>,
//     body: unknown
//   ): Promise<T> {
//     return this.request(endpoint, "POST", schema, body);
//   }
// }

// // Art-specific API client
// export class ArtClient extends ApiClient {
//   constructor() {
//     super("https://localhost:3000"); // Replace with your actual API base URL
//   }

//   private postSchema = z.object({
//     id: z.string(),
//     name: z.string(),
//     likes: z.number(),
//     updatedAt: z.string().transform((str) => new Date(str)),
//     creator: z.string(),
//     artform: z.object({
//       type: z.literal("Shiba"),
//       parameters: z.object({
//         fog: z.number(),
//       }),
//     }),
//   });

//   private postsSchema = z.array(this.postSchema);

//   async getPosts(): Promise<PostType[]> {
//     return this.get("/posts", this.postsSchema);
//   }

//   async createPost(
//     post: Omit<PostType, "id" | "likes" | "updatedAt">
//   ): Promise<PostType> {
//     return this.post("/posts", this.postSchema, post);
//   }

//   async getPost(id: string): Promise<PostType> {
//     return this.get(`/posts/${id}`, this.postSchema);
//   }
// }

// // Usage example:
// // const artClient = new ArtClient();
// // const posts = await artClient.getPosts();
// // const newPost = await artClient.createPost({
// //   name: 'New Post',
// //   creator: 'User',
// //   artform: { type: 'Shiba', parameters: { fog: 10 } },
// // });
