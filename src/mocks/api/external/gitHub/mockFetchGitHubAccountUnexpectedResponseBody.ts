import {
  type ResponseResolver,
  type MockedRequest,
  type restContext,
} from 'msw';

import { httpStatusCode } from '@/features';
export const mockFetchGitHubAccountUnexpectedResponseBody: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) =>
  res(
    ctx.status(httpStatusCode.ok),
    ctx.json({
      created_at: '2015-02-16T16:32:58Z',
      updated_at: '2023-02-09T03:39:20Z',
    })
  );
