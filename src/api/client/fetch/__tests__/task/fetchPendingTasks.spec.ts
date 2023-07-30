import 'whatwg-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fetchPendingTasks } from '@/api/client/fetch/task';
import {
  InvalidResponseBodyError,
  UnexpectedFeatureError,
  getBackendApiUrl,
  isPendingTasks,
} from '@/features';
import type { PendingTask } from '@/features';
import {
  mockInternalServerError,
  mockFetchPendingTasks,
  mockFetchPendingTasksEmptyResponseBody,
  mockFetchPendingTasksUnexpectedResponseBody,
  mockFetchPendingTasksUnexpectedResponseBodyStatusRecording,
} from '@/mocks';

type TestTable = {
  arg: unknown;
  expected: boolean;
};

const mockHandlers = [
  rest.get(getBackendApiUrl('getTasksPending'), mockFetchPendingTasks),
];

const mockServer = setupServer(...mockHandlers);

describe('src/api/client/fetch/task.ts fetchPendingTasks TestCases', () => {
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

  it('should be able to fetch some tasks pending.', async () => {
    const pendingTasks = await fetchPendingTasks({
      appToken: mockAppToken,
    });

    const expected = [
      {
        id: 1,
        status: 'pending',
        startAt: '2019-08-24T14:15:22Z',
        endAt: '2019-08-24T18:15:22Z',
        duration: 14400,
        taskCategoryId: 1,
      },
      {
        id: 2,
        status: 'pending',
        startAt: '2019-08-24T14:15:22Z',
        endAt: '2019-08-24T18:15:22Z',
        duration: 14400,
        taskCategoryId: 1,
      },
      {
        id: 3,
        status: 'pending',
        startAt: '2019-08-24T14:15:22Z',
        endAt: '2019-08-24T18:15:22Z',
        duration: 14400,
        taskCategoryId: 1,
      },
    ];

    expect(pendingTasks).toStrictEqual(expected);
  });

  it('should be able to fetch 0 tasks pending.', async () => {
    mockServer.use(
      rest.get(
        getBackendApiUrl('getTasksPending'),
        mockFetchPendingTasksEmptyResponseBody
      )
    );

    const pendingTasks = await fetchPendingTasks({
      appToken: mockAppToken,
    });

    const expected: PendingTask[] = [];
    expect(pendingTasks).toStrictEqual(expected);
  });

  it('should UnexpectedFeatureError Throw, because http status is not ok', async () => {
    mockServer.use(
      rest.get(getBackendApiUrl('getTasksPending'), mockInternalServerError)
    );

    const dto = {
      appToken: mockAppToken,
    } as const;

    await expect(fetchPendingTasks(dto)).rejects.toThrow(
      UnexpectedFeatureError
    );
  });

  it('should InvalidResponseBodyError Throw, because status of task is recording, but expected pending', async () => {
    mockServer.use(
      rest.get(
        getBackendApiUrl('getTasksPending'),
        mockFetchPendingTasksUnexpectedResponseBodyStatusRecording
      )
    );

    const dto = {
      appToken: mockAppToken,
    } as const;
    await expect(fetchPendingTasks(dto)).rejects.toThrow(
      InvalidResponseBodyError
    );
  });

  it('should InvalidResponseBodyError Throw, because unexpected response body.', async () => {
    mockServer.use(
      rest.get(
        getBackendApiUrl('getTasksPending'),
        mockFetchPendingTasksUnexpectedResponseBody
      )
    );

    const dto = {
      appToken: mockAppToken,
    } as const;
    await expect(fetchPendingTasks(dto)).rejects.toThrow(
      InvalidResponseBodyError
    );
  });

  it.each`
    arg                                                                                                                                                                                                                                                                       | expected
    ${[{ id: 1, status: 'pending', startAt: '2019-08-24T14:15:22Z', endAt: '2019-08-24T18:15:22Z', duration: 14400, taskCategoryId: 1 }]}                                                                                                                                     | ${true}
    ${[{ id: 1, status: 'pending', startAt: '2019-08-24T14:15:22Z', endAt: '2019-08-24T18:15:22Z', duration: 14400, taskCategoryId: 1 }, { id: 1, status: 'pending', startAt: '2019-08-24T14:15:22Z', endAt: '2019-08-24T18:15:22Z', duration: 14400, taskCategoryId: 1 }]}   | ${true}
    ${[{ id: 1, status: 'pending', startAt: '2019-08-24T14:15:22Z', endAt: '2019-08-24T18:15:22Z', duration: 14400, taskCategoryId: 1 }, { id: 1, status: 'recording', startAt: '2019-08-24T14:15:22Z', endAt: '2019-08-24T18:15:22Z', duration: 14400, taskCategoryId: 1 }]} | ${false}
    ${[]}                                                                                                                                                                                                                                                                     | ${true}
  `(
    'should returns $expected when the input is $arg',
    ({ arg, expected }: TestTable) => {
      const values = arg;

      expect(isPendingTasks(values)).toBe(expected);
    }
  );
});
