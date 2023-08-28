import { z } from 'zod';
import type { components } from '@/openapi/schema';

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
  categories: z.array(taskCategorySchema),
});

const taskGroupsSchema = z.array(taskGroupSchema);

export const isTaskGroups = (value: unknown): value is TaskGroup[] => {
  return taskGroupsSchema.safeParse(value).success;
};

export type FetchTaskGroups = (dto: FetchTaskGroupsDto) => Promise<TaskGroup[]>;
