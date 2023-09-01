import {
  type ResponseResolver,
  type MockedRequest,
  type restContext,
} from 'msw';

import { httpStatusCode } from '@/features';

export const mockFetchTaskGroupsUnexpectedResponseBody: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) =>
  res(
    ctx.status(httpStatusCode.ok),
    ctx.json({
      groups: [
        {
          id: null,
          name: null,
          categories: [
            {
              id: null,
              name: null,
            },
          ],
        },
      ],
    })
  );
