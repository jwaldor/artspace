import { User } from "@prisma/client";
import { postSchema } from "../common/ZodSchema";
import { z } from "zod";

declare global {
  namespace Express {
    interface Request {
      user?: User; // Optional user property
    }
  }
}

export type PostArtformType = z.infer<typeof postSchema.shape.artform>["type"];
