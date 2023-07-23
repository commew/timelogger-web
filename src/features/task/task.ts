import { z } from 'zod';
import type { components } from '@/openapi/schema';

type CreateTaskDto = {
  taskCategoryId: number;
  status: 'recording';
  startAt: string;
  appToken: string;
};

type StopTaskDto = {
  taskId: number;
  appToken: string;
};

type FetchTasksRecordingDto = {
  appToken: string;
};

export type Task = components['schemas']['Task'];
export type Tasks = {
  tasks?: Task[];
};
export type TaskRecording = Omit<Task, 'status'> & {
  status: 'recording';
};

const taskSchema = z.object({
  id: z.number(),
  status: z.union([
    z.literal('pending'),
    z.literal('completed'),
    z.literal('recording'),
  ]),
  startAt: z.string(),
  endAt: z.string(),
  duration: z.number(),
  taskCategoryId: z.number(),
});

const taskRecordingSchema = taskSchema.extend({
  status: z.literal('recording'),
});

const tasksRecordingSchema = z.object({
  tasks: z.array(taskRecordingSchema).nonempty(),
});

export const isTask = (value: unknown): value is Task => {
  const result = taskSchema.safeParse(value);

  return result.success;
};

export const isRecordingTasks = (value: unknown): value is TaskRecording[] => {
  return tasksRecordingSchema.safeParse(value).success;
};
export type CreateTask = (dto: CreateTaskDto) => Promise<Task>;
export type StopTask = (dto: StopTaskDto) => Promise<Task>;
export type FetchTasksRecording = (
  dto: FetchTasksRecordingDto
) => Promise<TaskRecording[]>;
