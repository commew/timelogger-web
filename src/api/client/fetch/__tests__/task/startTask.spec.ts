import 'whatwg-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { startTask } from '@/api/client/fetch/task';
import {
  InvalidResponseBodyError,
  UnexpectedFeatureError,
  getAppApiUrl,
} from '@/features';
import {
  mockInternalServerError,
  mockNextApiStartTask,
  mockNextApiStartTaskUnexpectedResponseBody,
} from '@/mocks';

const mockHandlers = [
  rest.patch(getAppApiUrl('startTask'), mockNextApiStartTask),
];

const mockServer = setupServer(...mockHandlers);

describe('src/api/client/fetch/task.ts startTask TestCases', () => {
  beforeAll(() => {
    mockServer.listen();
  });

  afterEach(() => {
    mockServer.resetHandlers();
  });

  afterAll(() => {
    mockServer.close();
  });

  it('should be able to start a task', async () => {
    const dto = { taskId: 1 } as const;
    const startedTask = await startTask(dto);

    const expected = {
      id: 1,
      status: 'recording',
      startAt: '2019-08-24T14:15:22Z',
      endAt: '2019-08-24T16:15:22Z',
      duration: 7200,
      taskGroupId: 1,
      taskCategoryId: 1,
    };

    expect(startedTask).toStrictEqual(expected);
  });

  it('should InvalidResponseBodyError Throw, because unexpected response body', async () => {
    mockServer.use(
      rest.patch(
        getAppApiUrl('startTask'),
        mockNextApiStartTaskUnexpectedResponseBody
      )
    );

    const dto = {
      taskId: 1,
    } as const;

    await expect(startTask(dto)).rejects.toThrow(InvalidResponseBodyError);
  });

  it('should UnexpectedFeatureError Throw, because http status is not ok', async () => {
    mockServer.use(
      rest.patch(getAppApiUrl('startTask'), mockInternalServerError)
    );

    const dto = {
      taskId: 1,
    } as const;

    await expect(startTask(dto)).rejects.toThrow(UnexpectedFeatureError);
  });
});
