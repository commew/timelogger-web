import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { createTask } from '@/api/server/fetch/task';
import { httpStatusCode } from '@/features';
import type { Task } from '@/features';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

interface NextApiRequestWithCreateTaskDto extends NextApiRequest {
  body: {
    taskCategoryId: number;
    status: 'recording';
    startAt: string;
  };
}

type ErrorData = {
  type: string;
  title: string;
};

const handler: NextApiHandler = async (
  req: NextApiRequestWithCreateTaskDto,
  res: NextApiResponse<Task | ErrorData>
) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(httpStatusCode.unauthorized).json({
      type: 'UNAUTHENTICATED',
      title: 'Please set appToken in Authorization Header.',
    });

    return;
  }

  try {
    const createTaskDto = { appToken: session.appToken, ...req.body };
    const createdTask = await createTask(createTaskDto);

    res.status(httpStatusCode.created).json(createdTask);
  } catch (error) {
    res.status(httpStatusCode.internalServerError).json({
      type: 'INTERNAL_SERVER_ERROR',
      title: 'Internal Server Error.',
    });
  }
};

export default handler;
