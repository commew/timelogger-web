import {
  type ResponseResolver,
  type MockedRequest,
  type restContext,
} from 'msw';

import { httpStatusCode } from '@/features';

export const mockStartTask: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) =>
  res(
    ctx.status(httpStatusCode.ok),
    ctx.json({
      id: 1,
      status: 'recording',
      startAt: '2019-08-24T14:15:22Z',
      endAt: '2019-08-24T16:15:22Z',
      duration: 7200,
      taskGroupId: 1,
      taskCategoryId: 1,
    })
  );
