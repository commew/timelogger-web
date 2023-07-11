import 'whatwg-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { createTask } from '@/api/client/fetch/task';
import {
  InvalidResponseBodyError,
  UnexpectedFeatureError,
  getBackendApiUrl,
} from '@/features';
import {
  mockCreateTask,
  mockCreateTaskUnexpectedResponseBody,
  mockInternalServerError,
} from '@/mocks';

const mockHandlers = [rest.post(getBackendApiUrl('tasks'), mockCreateTask)];

const mockServer = setupServer(...mockHandlers);

describe('src/api/client/fetch/task.ts createTask TestCases', () => {
  beforeAll(() => {
    mockServer.listen();
  });

  afterEach(() => {
    mockServer.resetHandlers();
  });

  afterAll(() => {
    mockServer.close();
  });

  it('should be able to create a task', async () => {
    const createdTask = await createTask({
      taskCategoryId: 1,
    });

    const expected = {
      id: 1,
      status: 'recording',
      startAt: '2019-08-24T14:15:22Z',
      taskCategoryId: 1,
    };

    expect(createdTask).toStrictEqual(expected);
  });

  it('should InvalidResponseBodyError Throw, because unexpected response body', async () => {
    mockServer.use(
      rest.post(getBackendApiUrl('tasks'), mockCreateTaskUnexpectedResponseBody)
    );

    const dto = {
      taskCategoryId: 1,
    } as const;

    await expect(createTask(dto)).rejects.toThrow(InvalidResponseBodyError);
  });

  it('should UnexpectedFeatureError Throw, because http status is not created', async () => {
    mockServer.use(
      rest.post(getBackendApiUrl('tasks'), mockInternalServerError)
    );

    const dto = {
      taskCategoryId: 1,
    } as const;

    await expect(createTask(dto)).rejects.toThrow(UnexpectedFeatureError);
  });
});
