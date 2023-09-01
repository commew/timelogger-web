import {
  InvalidResponseBodyError,
  UnexpectedFeatureError,
  getBackendApiUrl,
  httpStatusCode,
  isTaskGroups,
} from '@/features';
import type {
  FetchTaskGroups,
  TaskGroups,
} from '@/features/taskGroup/taskGroup';

export const fetchTaskGroups: FetchTaskGroups = async (dto) => {
  const { appToken } = dto;

  const response = await fetch(getBackendApiUrl('getTaskGroups'), {
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

  const fetchedTaskGroups = (await response.json()) as TaskGroups;

  if (!fetchedTaskGroups.groups) return [];

  const taskGroups = fetchedTaskGroups.groups;

  if (!isTaskGroups(taskGroups)) {
    throw new InvalidResponseBodyError(
      `responseBody is not in the expected format( expected status is 'recording'. body: ${JSON.stringify(
        taskGroups
      )} )`
    );
  }

  return taskGroups;
};
