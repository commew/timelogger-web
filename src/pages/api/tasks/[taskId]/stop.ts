import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { stopTask } from '@/api/server/fetch/task';
import { httpStatusCode } from '@/features';
import type { Task } from '@/features';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

interface NextApiRequestWithStopTaskDto extends NextApiRequest {
  query: {
    taskId?: string;
  };
}

type ErrorData = {
  type: string;
  title: string;
};

const handler: NextApiHandler = async (
  req: NextApiRequestWithStopTaskDto,
  res: NextApiResponse<Task | ErrorData>
) => {
  const session = await getServerSession(req, res, authOptions);
  const taskId = req.query.taskId;

  if (!session) {
    res.status(httpStatusCode.unauthorized).json({
      type: 'UNAUTHENTICATED',
      title: 'Please set appToken in Authorization Header.',
    });

    return;
  }

  if (taskId == null || isNaN(Number(taskId))) {
    res.status(httpStatusCode.badRequest).json({
      type: 'INVALID_TASK_ID',
      title: 'Invalid task id in Query Parameter.',
    });

    return;
  }

  try {
    const stopTaskDto = { appToken: session.appToken, taskId: Number(taskId) };
    const stoppedTask = await stopTask(stopTaskDto);

    res.status(httpStatusCode.ok).json(stoppedTask);
  } catch (error) {
    res.status(httpStatusCode.internalServerError).json({
      type: 'INTERNAL_SERVER_ERROR',
      title: 'Internal Server Error.',
    });
  }
};

export default handler;
