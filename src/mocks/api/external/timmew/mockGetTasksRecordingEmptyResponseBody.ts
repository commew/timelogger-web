import {
  type ResponseResolver,
  type MockedRequest,
  type restContext,
} from 'msw';

import { httpStatusCode } from '@/features';

export const mockFetchTaskRecordingEmptyResponseBody: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => res(ctx.status(httpStatusCode.ok), ctx.json({}));
