import 'whatwg-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { startTask } from '@/api/server/fetch/task';
import {
  InvalidResponseBodyError,
  UnexpectedFeatureError,
  getDynamicBackendApiUrl,
} from '@/features';
import {
  mockStartTask,
  mockStartTaskUnexpectedResponseBody,
  mockInternalServerError,
} from '@/mocks';

const mockHandlers = [
  rest.patch(getDynamicBackendApiUrl('startTask', '1'), mockStartTask),
];

const mockServer = setupServer(...mockHandlers);

describe('src/api/server/fetch/task.ts startTask TestCases', () => {
  beforeAll(() => {
    mockServer.listen();
  });

  afterEach(() => {
    mockServer.resetHandlers();
  });

  afterAll(() => {
    mockServer.close();
  });

  const mockAppToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OSIsInByb3ZpZGVyIjoiZ29vZ2xlIiwiZXhwIjoxNjgzNzMxMzIzLCJqdGkiOiIzNTY3ZGIyNy0zM2RlLTQyMTctOGM5Zi01ODhhYjVkMDdhZGQiLCJpYXQiOjE2ODExMzkzOTZ9.wV-4ftbM7EwPvyzoqWTNKaC1eZko3juJ84Q9C6X_dYs';

  it('should be able to start a task', async () => {
    const startedTask = await startTask({
      taskId: 1,
      appToken: mockAppToken,
    });

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
        getDynamicBackendApiUrl('startTask', '1'),
        mockStartTaskUnexpectedResponseBody
      )
    );

    const dto = {
      taskId: 1,
      appToken: mockAppToken,
    } as const;

    await expect(startTask(dto)).rejects.toThrow(InvalidResponseBodyError);
  });

  it('should UnexpectedFeatureError Throw, because http status is not ok', async () => {
    mockServer.use(
      rest.patch(
        getDynamicBackendApiUrl('startTask', '1'),
        mockInternalServerError
      )
    );

    const dto = {
      taskId: 1,
      appToken: mockAppToken,
    } as const;

    await expect(startTask(dto)).rejects.toThrow(UnexpectedFeatureError);
  });
});
