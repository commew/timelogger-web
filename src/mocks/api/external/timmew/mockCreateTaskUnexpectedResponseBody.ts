import {
  type ResponseResolver,
  type MockedRequest,
  type restContext,
} from 'msw';

import { httpStatusCode } from '@/features';

export const mockCreateTaskUnexpectedResponseBody: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) =>
  res(
    ctx.status(httpStatusCode.created),
    ctx.json({
      id: null,
      status: null,
      startAt: null,
      endAt: null,
      duration: null,
      taskCategoryId: null,
    })
  );
