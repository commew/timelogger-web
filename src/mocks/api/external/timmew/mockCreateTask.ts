import {
  type ResponseResolver,
  type MockedRequest,
  type restContext,
} from 'msw';

import { httpStatusCode } from '@/features';

export const mockCreateTask: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) =>
  res(
    ctx.status(httpStatusCode.created),
    ctx.json({
      id: 1,
      status: 'recording',
      startAt: '2019-08-24T14:15:22Z',
      taskCategoryId: 1,
    })
  );
