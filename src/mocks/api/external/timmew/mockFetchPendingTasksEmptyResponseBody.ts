import {
  type ResponseResolver,
  type MockedRequest,
  type restContext,
} from 'msw';

import { httpStatusCode } from '@/features';

export const mockFetchPendingTasksEmptyResponseBody: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => res(ctx.status(httpStatusCode.ok), ctx.json({}));
