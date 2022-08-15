import { API_URL } from '../../../utils/api';
import { post } from '../../../factories/Post';
import { BaseRequestResponse } from '../../../infrastructure/api/interfaces';
import { CreateCommentParams } from '../intefaces';

export const createComment = async (
  data: CreateCommentParams
): Promise<BaseRequestResponse> => {
  return await post(API_URL.COMMENT.POST_COMMENT, data, true);
};
