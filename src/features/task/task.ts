import { z } from 'zod';
import type { components } from '@/openapi/schema';

type CreateTaskDto = {
  taskCategoryId: number;
  status: 'recording';
  startAt: string;
  appToken: string;
};

type NextApiRequestBodyOfCreateTaskDto = {
  taskCategoryId: number;
  status: 'recording';
  startAt: string;
};

type StopTaskDto = {
  taskId: number;
  appToken: string;
};

type NextApiRequestBodyOfStopTaskDto = {
  taskId: number;
};

type CompleteTaskDto = {
  taskId: number;
  appToken: string;
};

type FetchTasksRecordingDto = {
  appToken: string;
};

type FetchPendingTasksDto = {
  appToken: string;
};

export type Task = components['schemas']['Task'];
export type Tasks = {
  tasks?: Task[];
};
export type TaskRecording = Omit<Task, 'status'> & {
  status: 'recording';
};
export type PendingTask = Omit<Task, 'status'> & {
  status: 'pending';
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

const tasksRecordingSchema = z.array(taskRecordingSchema);

const pendingTaskSchema = taskSchema.extend({
  status: z.literal('pending'),
});

const pendingTasksSchema = z.array(pendingTaskSchema);

const nextApiRequestBodyOfCreateTaskDtoSchema = z.object({
  taskCategoryId: z.number(),
  status: z.literal('recording'),
  startAt: z.string(),
});

const nextApiRequestBodyOfStopTaskDtoSchema = z.object({
  taskId: z.number(),
});

export const isTask = (value: unknown): value is Task => {
  const result = taskSchema.safeParse(value);

  return result.success;
};

export const isRecordingTasks = (value: unknown): value is TaskRecording[] => {
  return tasksRecordingSchema.safeParse(value).success;
};
export const isPendingTasks = (value: unknown): value is PendingTask[] => {
  return pendingTasksSchema.safeParse(value).success;
};
export const isNextApiRequestBodyOfCreateTaskDto = (
  value: unknown
): value is NextApiRequestBodyOfCreateTaskDto => {
  return nextApiRequestBodyOfCreateTaskDtoSchema.safeParse(value).success;
};
export const isNextApiRequestBodyOfStopTaskDto = (
  value: unknown
): value is NextApiRequestBodyOfStopTaskDto => {
  return nextApiRequestBodyOfStopTaskDtoSchema.safeParse(value).success;
};
export type CreateTask = (dto: CreateTaskDto) => Promise<Task>;
export type StopTask = (dto: StopTaskDto) => Promise<Task>;
export type CompleteTask = (dto: CompleteTaskDto) => Promise<Task>;
export type FetchTasksRecording = (
  dto: FetchTasksRecordingDto
) => Promise<TaskRecording[]>;
export type FetchPendingTasks = (
  dto: FetchPendingTasksDto
) => Promise<PendingTask[]>;
