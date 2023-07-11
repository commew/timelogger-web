import { z } from 'zod';
import type { components } from '@/openapi/schema';

type CreateTaskDto = {
  taskCategoryId: number;
};

export type Task = components['schemas']['Task'];

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