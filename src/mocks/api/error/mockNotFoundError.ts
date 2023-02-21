import {
  type ResponseResolver,
  type MockedRequest,
  type restContext,
} from 'msw';
import { httpStatusCode } from '@/features';
export const mockNotFoundError: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) =>
  res(
    ctx.status(httpStatusCode.notFound),
    ctx.json({
      code: httpStatusCode.notFound,
      message: 'Not Found',
    })
  );
