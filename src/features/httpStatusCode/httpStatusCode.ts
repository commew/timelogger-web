// https://developer.mozilla.org/ja/docs/Web/HTTP/Status から必要なものを抜粋して定義
export const httpStatusCode = {
  ok: 200,
  created: 201,
  accepted: 202,
  noContent: 204,
  movedPermanently: 301,
  found: 302,
  temporaryRedirect: 307,
  permanentRedirect: 308,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  methodNotAllowed: 405,
  requestTimeout: 408,
  conflict: 409,
  gone: 409,
  unprocessableEntity: 422,
  locked: 423,
  tooManyRequests: 429,
  internalServerError: 500,
  badGateway: 502,
  serviceUnavailable: 503,
} as const;

export type HttpStatusCode =
  (typeof httpStatusCode)[keyof typeof httpStatusCode];
