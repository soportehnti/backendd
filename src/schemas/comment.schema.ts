import { z } from "zod";
import { Comment } from "../models/comment.model";

export const CommentSchema = z.object({
    id: z.string().cuid().optional(),
    // updated_at: z.date().optional(),
    // created_at: z.date().optional(),

    text: z.string(),
    author_id: z.string().cuid().optional(),
    ticket_id: z.string().cuid(),
})

export const PartialCommentSchema = CommentSchema.partial();
