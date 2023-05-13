import {
  type ResponseResolver,
  type MockedRequest,
  type restContext,
} from 'msw';

import { httpStatusCode } from '@/features';

export const mockAccountUnAuthenticatedError: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) =>
  res(
    ctx.status(httpStatusCode.unauthorized),
    ctx.json({
      type: 'UNAUTHENTICATED',
      title: 'Account is not authenticated.',
    })
  );
