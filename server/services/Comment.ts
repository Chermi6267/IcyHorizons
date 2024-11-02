import { IComment, ICommentModify } from "../interfaces/Comment";
import { CommentRepository } from "../repositories/Comment";

const commentRepository = new CommentRepository();

export class CommentService {
  async getAllComments() {
    try {
      const comments = await commentRepository.getAllComments();

      return comments;
    } catch (error) {
      throw error;
    }
  }

  async getByLandmarkId(landmarkId: number) {
    try {
      const comments = await commentRepository.getByLandmarkId(landmarkId);

      return comments;
    } catch (error) {
      throw error;
    }
  }

  async createComment(options: IComment) {
    try {
      const comment = await commentRepository.createComment(options);

      return comment;
    } catch (error) {
      throw error;
    }
  }

  async modifyComment(options: ICommentModify) {
    try {
      const comment = await commentRepository.modifyComment(options);

      return comment;
    } catch (error) {
      throw error;
    }
  }

  async deleteComment(userId: number, commentId: number) {
    try {
      const comment = await commentRepository.deleteComment(userId, commentId);

      return comment;
    } catch (error) {
      throw error;
    }
  }
}
