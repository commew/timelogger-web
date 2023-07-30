import 'whatwg-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fetchTasksPending } from '@/api/client/fetch/task';
import {
  InvalidResponseBodyError,
  UnexpectedFeatureError,
  getBackendApiUrl,
  isPendingTasks,
} from '@/features';
import type { TaskPending } from '@/features';
import {
  mockInternalServerError,
  mockFetchTasksPending,
  mockFetchTasksPendingEmptyResponseBody,
  mockFetchTasksPendingUnexpectedResponseBody,
  mockFetchTasksPendingUnexpectedResponseBodyStatusRecording,
} from '@/mocks';

type TestTable = {
  arg: unknown;
  expected: boolean;
};

const mockHandlers = [
  rest.get(getBackendApiUrl('getTasksPending'), mockFetchTasksPending),
];

const mockServer = setupServer(...mockHandlers);

describe('src/api/client/fetch/task.ts fetchTasksPending TestCases', () => {
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
    const tasksPending = await fetchTasksPending({
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

    expect(tasksPending).toStrictEqual(expected);
  });

  it('should be able to fetch 0 tasks pending.', async () => {
    mockServer.use(
      rest.get(
        getBackendApiUrl('getTasksPending'),
        mockFetchTasksPendingEmptyResponseBody
      )
    );

    const tasksPending = await fetchTasksPending({
      appToken: mockAppToken,
    });

    const expected: TaskPending[] = [];
    expect(tasksPending).toStrictEqual(expected);
  });

  it('should UnexpectedFeatureError Throw, because http status is not ok', async () => {
    mockServer.use(
      rest.get(getBackendApiUrl('getTasksPending'), mockInternalServerError)
    );

    const dto = {
      appToken: mockAppToken,
    } as const;

    await expect(fetchTasksPending(dto)).rejects.toThrow(
      UnexpectedFeatureError
    );
  });

  it('should InvalidResponseBodyError Throw, because status of task is recording, but expected pending', async () => {
    mockServer.use(
      rest.get(
        getBackendApiUrl('getTasksPending'),
        mockFetchTasksPendingUnexpectedResponseBodyStatusRecording
      )
    );

    const dto = {
      appToken: mockAppToken,
    } as const;
    await expect(fetchTasksPending(dto)).rejects.toThrow(
      InvalidResponseBodyError
    );
  });

  it('should InvalidResponseBodyError Throw, because unexpected response body.', async () => {
    mockServer.use(
      rest.get(
        getBackendApiUrl('getTasksPending'),
        mockFetchTasksPendingUnexpectedResponseBody
      )
    );

    const dto = {
      appToken: mockAppToken,
    } as const;
    await expect(fetchTasksPending(dto)).rejects.toThrow(
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
