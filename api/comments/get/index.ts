import { API_URL } from "../../../utils/api";
import { getList } from "../../../factories/Get";
import { Paging } from "../../../infrastructure/api/interfaces";
import { Comment } from "../../../infrastructure/models/Comment";
import { GetListActionResult } from "../../../factories/interfaces/get";

export type GetCommentsListActionResult = GetListActionResult<Comment>;

export const getCommentsList = async (
  paging: Paging,
  categoryPostId: string,
  signal: AbortController
) => {
  return await getList<Comment>(
    API_URL.COMMENT.GET_LIST,
    true,
    { categoryPostId },
    paging,
    signal
  );
};
