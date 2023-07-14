import type { Task, CreateTask, StopTask } from '@/features';
import {
  getBackendApiUrl,
  httpStatusCode,
  InvalidResponseBodyError,
  UnexpectedFeatureError,
  isTask,
  getDynamicBackendApiUrl,
} from '@/features';
import type { components } from '@/openapi/schema';

export const createTask: CreateTask = async (dto) => {
  const { taskCategoryId, appToken } = dto;

  const requestBody: components['schemas']['Task'] = {
    taskCategoryId,
  };

  const response = await fetch(getBackendApiUrl('tasks'), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${appToken}`,
      'Content-Type': 'application/json',
      Prefer: 'code=201, example=ExampleSuccess',
    },
    body: JSON.stringify(requestBody),
  });

  if (response.status !== httpStatusCode.created) {
    throw new UnexpectedFeatureError(
      `failed to createTask. status: ${
        response.status
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

export const stopTask: StopTask = async (dto) => {
  const { taskId, appToken } = dto;

  const response = await fetch(
    getDynamicBackendApiUrl('stopTask', `${taskId}`),
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${appToken}`,
        Prefer: 'code=200, example=ExampleSuccess',
      },
    }
  );

  if (response.status !== httpStatusCode.ok) {
    throw new UnexpectedFeatureError(
      `failed to createTask. status: ${
        response.status
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
