import type {
  Task,
  Tasks,
  CreateTask,
  StopTask,
  CompleteTask,
  FetchTasksRecording,
  FetchTasksPending,
} from '@/features';
import {
  getBackendApiUrl,
  httpStatusCode,
  InvalidResponseBodyError,
  UnexpectedFeatureError,
  isTask,
  isRecordingTasks,
  isPendingTasks,
  getDynamicBackendApiUrl,
} from '@/features';
import { type operations } from '@/openapi/schema';

export const createTask: CreateTask = async (dto) => {
  const { taskCategoryId, status, startAt, appToken } = dto;

  const requestBody: operations['postTasks']['requestBody'] = {
    content: {
      'application/json': {
        taskCategoryId,
        status,
        startAt,
      },
    },
  };

  const response = await fetch(getBackendApiUrl('tasks'), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${appToken}`,
      'Content-Type': 'application/json',
      Prefer: 'code=201, example=ExampleSuccess',
    },
    body: JSON.stringify(requestBody.content['application/json']),
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

export const completeTask: CompleteTask = async (dto) => {
  const { taskId, appToken } = dto;

  const response = await fetch(
    getDynamicBackendApiUrl('completeTask', `${taskId}`),
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
      `failed to completeTask. status: ${
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

export const fetchTasksRecording: FetchTasksRecording = async (dto) => {
  const { appToken } = dto;

  const response = await fetch(getBackendApiUrl('getTasksRecording'), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${appToken}`,
      Prefer: 'code=200, example=ExampleSuccess',
    },
  });

  if (response.status !== httpStatusCode.ok) {
    throw new UnexpectedFeatureError(
      `failed to fetchTasksRecording. status: ${
        response.status
      }, body: ${await response.text()}`
    );
  }

  const fetchedTasks = (await response.json()) as Tasks;

  if (!fetchedTasks.tasks) return [];

  const tasksRecording = fetchedTasks.tasks;

  if (!isRecordingTasks(tasksRecording)) {
    throw new InvalidResponseBodyError(
      `responseBody is not in the expected format( expected status is 'recording'. body: ${JSON.stringify(
        tasksRecording
      )} )`
    );
  }

  return tasksRecording;
};

export const fetchTasksPending: FetchTasksPending = async (dto) => {
  const { appToken } = dto;

  const response = await fetch(getBackendApiUrl('getTasksPending'), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${appToken}`,
      Prefer: 'code=200, example=ExampleSuccess',
    },
  });

  if (response.status !== httpStatusCode.ok) {
    throw new UnexpectedFeatureError(
      `failed to fetchTasksPending. status: ${
        response.status
      }, body: ${await response.text()}`
    );
  }

  const fetchedTasks = (await response.json()) as Tasks;

  if (!fetchedTasks.tasks) return [];

  const tasksPending = fetchedTasks.tasks;

  if (!isPendingTasks(tasksPending)) {
    throw new InvalidResponseBodyError(
      `responseBody is not in the expected format( expected status is 'pending'. body: ${JSON.stringify(
        tasksPending
      )} )`
    );
  }

  return tasksPending;
};
