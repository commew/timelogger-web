import {
  getAppApiUrl,
  httpStatusCode,
  InvalidResponseBodyError,
  isCompletedTask,
  isPendingTask,
  isRecordingTask,
  UnexpectedFeatureError,
} from '@/features';
import type {
  CompletedTask,
  CompleteTaskFromClient,
  CreateTaskFromClient,
  PendingTask,
  StartTaskFromClient,
  StopTaskFromClient,
  TaskRecording,
} from '@/features';
import { type operations } from '@/openapi/schema';

export const createTask: CreateTaskFromClient = async (dto) => {
  const { taskGroupId, taskCategoryId, status } = dto;

  const requestBody: operations['postTasks']['requestBody'] = {
    content: {
      'application/json': {
        taskGroupId,
        taskCategoryId,
        status,
      },
    },
  };

  const response = await fetch(getAppApiUrl('tasks'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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

  const task = (await response.json()) as TaskRecording;
  if (!isRecordingTask(task)) {
    throw new InvalidResponseBodyError(
      `responseBody is not in the expected format. body: ${JSON.stringify(
        task
      )}`
    );
  }

  return task;
};

export const startTask: StartTaskFromClient = async (dto) => {
  const { taskId } = dto;

  const requestBody = {
    content: {
      'application/json': {
        taskId,
      },
    },
  };

  const response = await fetch(getAppApiUrl('startTask'), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody.content['application/json']),
  });

  if (response.status !== httpStatusCode.ok) {
    throw new UnexpectedFeatureError(
      `failed to startTask. status: ${
        response.status
      }, body: ${await response.text()}`
    );
  }

  const task = (await response.json()) as TaskRecording;
  if (!isRecordingTask(task)) {
    throw new InvalidResponseBodyError(
      `responseBody is not in the expected format. body: ${JSON.stringify(
        task
      )}`
    );
  }

  return task;
};

export const stopTask: StopTaskFromClient = async (dto) => {
  const { taskId } = dto;

  const requestBody = {
    content: {
      'application/json': {
        taskId,
      },
    },
  };

  const response = await fetch(getAppApiUrl('stopTask'), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody.content['application/json']),
  });

  if (response.status !== httpStatusCode.ok) {
    throw new UnexpectedFeatureError(
      `failed to stopTask. status: ${
        response.status
      }, body: ${await response.text()}`
    );
  }

  const task = (await response.json()) as PendingTask;
  if (!isPendingTask(task)) {
    throw new InvalidResponseBodyError(
      `responseBody is not in the expected format. body: ${JSON.stringify(
        task
      )}`
    );
  }

  return task;
};

export const completeTask: CompleteTaskFromClient = async (dto) => {
  const { taskId } = dto;

  const requestBody = {
    content: {
      'application/json': {
        taskId,
      },
    },
  };

  const response = await fetch(getAppApiUrl('completeTask'), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody.content['application/json']),
  });

  if (response.status !== httpStatusCode.ok) {
    throw new UnexpectedFeatureError(
      `failed to stopTask. status: ${
        response.status
      }, body: ${await response.text()}`
    );
  }

  const task = (await response.json()) as CompletedTask;
  if (!isCompletedTask(task)) {
    throw new InvalidResponseBodyError(
      `responseBody is not in the expected format. body: ${JSON.stringify(
        task
      )}`
    );
  }

  return task;
};
