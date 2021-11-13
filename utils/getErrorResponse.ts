import { ResponseStatus } from "../infrastructure/api/enums";

export const getErrorResponse = (error: string) => ({
  message: error,
  responseStatus: ResponseStatus.Failed,
});
