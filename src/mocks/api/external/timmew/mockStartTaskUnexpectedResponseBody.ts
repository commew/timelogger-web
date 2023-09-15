import {
  type ResponseResolver,
  type MockedRequest,
  type restContext,
} from 'msw';

import { httpStatusCode } from '@/features';

export const mockStartTaskUnexpectedResponseBody: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) =>
  res(
    ctx.status(httpStatusCode.ok),
    ctx.json({
      id: null,
      status: null,
      startAt: null,
      endAt: null,
      duration: null,
      taskGroupId: null,
      taskCategoryId: null,
    })
  );
