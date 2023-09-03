import { z } from 'zod';
import { TaskCategoryNotFoundError, TaskGroupNotFoundError } from '@/features';
import type { components } from '@/openapi/schema';

type TaskCategory = components['schemas']['TaskCategory'];
export type TaskGroup = components['schemas']['TaskGroup'];
export type TaskGroups = {
  groups?: TaskGroup[];
};

type FetchTaskGroupsDto = {
  appToken: string;
};

const taskCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
});

const taskGroupSchema = z.object({
  id: z.number(),
  name: z.string(),
  categories: z.array(taskCategorySchema).nonempty(),
});

const taskGroupsSchema = z.array(taskGroupSchema);

export const isTaskGroups = (value: unknown): value is TaskGroup[] => {
  return taskGroupsSchema.safeParse(value).success;
};

export type FetchTaskGroups = (dto: FetchTaskGroupsDto) => Promise<TaskGroup[]>;

export const findTaskGroupById = (
  taskGroups: TaskGroup[],
  taskGroupId: number
): TaskGroup => {
  const taskGroup = taskGroups.find((taskGroup) => {
    return taskGroupId === taskGroup.id;
  });

  if (!taskGroup) {
    throw new TaskGroupNotFoundError();
  }

  return taskGroup;
};

export const findTaskCategoryById = (
  taskGroups: TaskGroup[],
  taskCategoryId: number
): TaskCategory => {
  const taskCategory = taskGroups
    .flatMap((taskGroup) => taskGroup.categories)
    .find((taskCategory) => {
      return taskCategoryId === taskCategory.id;
    });

  if (!taskCategory) {
    throw new TaskCategoryNotFoundError();
  }

  return taskCategory;
};
