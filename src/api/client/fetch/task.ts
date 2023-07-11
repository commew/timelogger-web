import type { Task, CreateTask } from '@/features';
import {
  getBackendApiUrl,
  httpStatusCode,
  InvalidResponseBodyError,
  UnexpectedFeatureError,
  isTask,
} from '@/features';
import type { components } from '@/openapi/schema';

export const createTask: CreateTask = async (dto) => {
  const { taskCategoryId } = dto;

  const requestBody: components['schemas']['Task'] = {
    taskCategoryId
  };

  const response = await fetch(getBackendApiUrl('tasks'), {
    method: 'POST',
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`,
      'Content-Type': 'application/json',
      Prefer: 'code=201, example=ExampleSuccess',
    },
    body: JSON.stringify(requestBody),
  });

  if (response.status !== httpStatusCode.created) {
    throw new UnexpectedFeatureError(
      `failed to createTask. status: ${response.status
      }, body: ${await response.text()}`
    );
  }

  const task = (await response.json()) as Task;
  if (!isTask(task)) {
    throw new InvalidResponseBodyError(
      `responseBody is not in the expected format. body: ${JSON.stringify(
        task
      )}`
    );
  }

  return task;
};
