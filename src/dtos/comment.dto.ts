import { Comment } from "../models/comment.model";

export type CommentDTO = Comment
export type CreateCommentDTO = Omit<Comment, 'id' | 'created_at' | 'updated_at'>
export type UpdateCommentDTO = Partial<CreateCommentDTO>
