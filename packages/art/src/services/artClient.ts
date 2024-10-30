import { z } from "zod";
import { PostType, InProgressPostType } from "./artService";
import { postSchema, newPostSchema } from "../ZodSchema";
import { postApi } from "../ZodSchema";
import { Zodios } from "@zodios/core";

// Generic API client
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    schema: z.ZodType<T>,
    body?: unknown,
    token?: string
  ): Promise<T> {
    console.log("request", token);
    try {
      console.log(`${this.baseUrl}${endpoint}`);
      console.log("sent", {
        method,
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return schema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
      } else if (error instanceof Error) {
        console.error("Request error:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
      throw error;
    }
  }

  protected get<T>(
    endpoint: string,
    schema: z.ZodType<T>,
    token?: string
  ): Promise<T> {
    return this.request(endpoint, "GET", schema, token);
  }

  protected post<T>(
    endpoint: string,
    schema: z.ZodType<T>,
    body: unknown,
    token?: string
  ): Promise<T> {
    return this.request(endpoint, "POST", schema, body, token);
  }
}

// Art-specific API client
export class ArtClient extends ApiClient {
  constructor() {
    super("http://localhost:5173"); // Replace with your actual API base URL
  }

  private postSchema = postSchema;
  private newPostSchema = newPostSchema;

  //   private inProgressPostSchema = z.object({
  //     name: z.string(),
  //     artform: z.object({
  //       type: z.literal("Shiba"),
  //       parameters: z.object({
  //         fog: z.number(),
  //       }),
  //     }),
  //   });

  private postsSchema = z.array(this.postSchema);

  async getPosts(): Promise<PostType[]> {
    return this.get("/allPosts", this.postsSchema);
  }

  async createPost(
    post: InProgressPostType,
    token?: string
  ): Promise<PostType> {
    console.log("createPost", post);
    console.log("token", token);
    return this.post("/createPost", this.postSchema, post, token);
  }

  async getPost(id: string): Promise<PostType> {
    return this.get(`/posts/${id}`, this.postSchema);
  }
}

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not set");
}

export const zapiClient = new Zodios(process.env.NEXT_PUBLIC_API_URL, postApi);
