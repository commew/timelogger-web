import {
  type ResponseResolver,
  type MockedRequest,
  type restContext,
} from 'msw';

import { httpStatusCode } from '@/features';

export const mockFetchTasksPendingUnexpectedResponseBodyStatusRecording: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) =>
  res(
    ctx.status(httpStatusCode.ok),
    ctx.json({
      tasks: [
        {
          id: 1,
          status: 'recording',
          startAt: '2019-08-24T14:15:22Z',
          endAt: '2019-08-24T18:15:22Z',
          duration: 14400,
          taskCategoryId: 1,
        },
      ],
    })
  );
