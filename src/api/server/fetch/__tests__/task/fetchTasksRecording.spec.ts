import 'whatwg-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fetchTasksRecording } from '@/api/server/fetch/task';
import {
  InvalidResponseBodyError,
  UnexpectedFeatureError,
  getBackendApiUrl,
  isRecordingTasks,
} from '@/features';
import type { TaskRecording } from '@/features';
import {
  mockInternalServerError,
  mockFetchTaskRecording,
  mockFetchTaskRecordingEmptyResponseBody,
  mockFetchTasksRecordingUnexpectedResponseBodyStatusPending,
  mockFetchTasksRecordingUnexpectedResponseBody,
} from '@/mocks';

type TestTable = {
  arg: unknown;
  expected: boolean;
};

const mockHandlers = [
  rest.get(getBackendApiUrl('getTasksRecording'), mockFetchTaskRecording),
];

const mockServer = setupServer(...mockHandlers);

describe('src/api/client/fetch/task.ts fetchTasksRecording TestCases', () => {
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

  it('should be able to fetch some tasks recording.', async () => {
    const tasksRecording = await fetchTasksRecording({
      appToken: mockAppToken,
    });

    const expected = [
      {
        id: 1,
        status: 'recording',
        startAt: '2019-08-24T14:15:22Z',
        endAt: '2019-08-24T18:15:22Z',
        duration: 14400,
        taskCategoryId: 1,
      },
      {
        id: 2,
        status: 'recording',
        startAt: '2019-08-24T14:15:22Z',
        endAt: '2019-08-24T18:15:22Z',
        duration: 14400,
        taskCategoryId: 1,
      },
      {
        id: 3,
        status: 'recording',
        startAt: '2019-08-24T14:15:22Z',
        endAt: '2019-08-24T18:15:22Z',
        duration: 14400,
        taskCategoryId: 1,
      },
    ];

    expect(tasksRecording).toStrictEqual(expected);
  });

  it('should be able to fetch 0 tasks recording.', async () => {
    mockServer.use(
      rest.get(
        getBackendApiUrl('getTasksRecording'),
        mockFetchTaskRecordingEmptyResponseBody
      )
    );

    const tasksRecording = await fetchTasksRecording({
      appToken: mockAppToken,
    });

    const expected: TaskRecording[] = [];
    expect(tasksRecording).toStrictEqual(expected);
  });

  it('should UnexpectedFeatureError Throw, because http status is not ok', async () => {
    mockServer.use(
      rest.get(getBackendApiUrl('getTasksRecording'), mockInternalServerError)
    );

    const dto = {
      appToken: mockAppToken,
    } as const;

    await expect(fetchTasksRecording(dto)).rejects.toThrow(
      UnexpectedFeatureError
    );
  });

  it('should InvalidResponseBodyError Throw, because status of task is pending, but expected recording', async () => {
    mockServer.use(
      rest.get(
        getBackendApiUrl('getTasksRecording'),
        mockFetchTasksRecordingUnexpectedResponseBodyStatusPending
      )
    );

    const dto = {
      appToken: mockAppToken,
    } as const;
    await expect(fetchTasksRecording(dto)).rejects.toThrow(
      InvalidResponseBodyError
    );
  });

  it('shold InvalidResponseBodyError Throw, because unexpected response body.', async () => {
    mockServer.use(
      rest.get(
        getBackendApiUrl('getTasksRecording'),
        mockFetchTasksRecordingUnexpectedResponseBody
      )
    );

    const dto = {
      appToken: mockAppToken,
    } as const;
    await expect(fetchTasksRecording(dto)).rejects.toThrow(
      InvalidResponseBodyError
    );
  });

  it.each`
    arg                                                                                                                                                                                                                                                                         | expected
    ${[{ id: 1, status: 'recording', startAt: '2019-08-24T14:15:22Z', endAt: '2019-08-24T18:15:22Z', duration: 14400, taskCategoryId: 1 }]}                                                                                                                                     | ${true}
    ${[{ id: 1, status: 'recording', startAt: '2019-08-24T14:15:22Z', endAt: '2019-08-24T18:15:22Z', duration: 14400, taskCategoryId: 1 }, { id: 1, status: 'recording', startAt: '2019-08-24T14:15:22Z', endAt: '2019-08-24T18:15:22Z', duration: 14400, taskCategoryId: 1 }]} | ${true}
    ${[{ id: 1, status: 'recording', startAt: '2019-08-24T14:15:22Z', endAt: '2019-08-24T18:15:22Z', duration: 14400, taskCategoryId: 1 }, { id: 1, status: 'pending', startAt: '2019-08-24T14:15:22Z', endAt: '2019-08-24T18:15:22Z', duration: 14400, taskCategoryId: 1 }]}   | ${false}
    ${[]}                                                                                                                                                                                                                                                                       | ${true}
  `(
    'should returns $expected when the input is $arg',
    ({ arg, expected }: TestTable) => {
      const values = arg;

      expect(isRecordingTasks(values)).toBe(expected);
    }
  );
});
