import {
  type ResponseResolver,
  type MockedRequest,
  type restContext,
} from 'msw';

import { httpStatusCode } from '@/features';

export const mockFetchTasksRecordingUnexpectedResponseBody: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) =>
    res(
      ctx.status(httpStatusCode.ok),
      ctx.json({
        tasks: [
          {
            id: null,
            status: null,
            startAt: null,
            endAt: null,
            duration: null,
            taskCategoryId: null,
          },
        ],
      })
    );
