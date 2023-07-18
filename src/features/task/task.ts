import { z } from 'zod';
import type { components } from '@/openapi/schema';

type CreateTaskDto = {
  taskCategoryId: number;
  appToken: string;
};

type StopTaskDto = {
  taskId: number;
  appToken: string;
};

type GetTasksRecordingDto = {
  appToken: string;
};

export type Task = components['schemas']['Task'];
export type Tasks = {
  tasks?: Task[];
};

const taskSchema = z.object({
  id: z.optional(z.number()),
  status: z.optional(
    z.union([
      z.literal('pending'),
      z.literal('completed'),
      z.literal('recording'),
    ])
  ),
  startAt: z.optional(z.string()),
  endAt: z.optional(z.string()),
  duration: z.optional(z.number()),
  taskCategoryId: z.number(),
});

export const isTask = (value: unknown): value is Task => {
  const result = taskSchema.safeParse(value);

  return result.success;
};

export type CreateTask = (dto: CreateTaskDto) => Promise<Task>;
export type StopTask = (dto: StopTaskDto) => Promise<Task>;
export type GetTasksRecording = (
  dto: GetTasksRecordingDto
) => Promise<Tasks | undefined>;
