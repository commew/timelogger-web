import {
  type ResponseResolver,
  type MockedRequest,
  type restContext,
} from 'msw';

import { httpStatusCode } from '@/features';

export const mockFindAccount: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) =>
  res(
    ctx.status(httpStatusCode.ok),
    ctx.json({
      id: 1,
      name: 'すみっこねこ',
      openIdProviders: [
        {
          sub: '99999999999999999999999999999',
          provider: 'google',
        },
      ],
    })
  );
