import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { completeTask } from '@/api/server/fetch/task';
import {
  httpStatusCode,
  isNextApiRequestBodyOfCompleteTaskDto,
} from '@/features';
import type { Task } from '@/features';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

type ErrorData = {
  type: string;
  title: string;
};

const handler: NextApiHandler = async (
  req: NextApiRequest,
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
    if (!isNextApiRequestBodyOfCompleteTaskDto(req.body)) {
      res.status(httpStatusCode.badRequest).json({
        type: 'BAD_REQUEST',
        title: 'Invalid request body.',
      });

      return;
    }

    const completeTaskDto = { appToken: session.appToken, ...req.body };
    const completedTask = await completeTask(completeTaskDto);

    res.status(httpStatusCode.ok).json(completedTask);
  } catch (error) {
    res.status(httpStatusCode.internalServerError).json({
      type: 'INTERNAL_SERVER_ERROR',
      title: 'Internal Server Error.',
    });
  }
};

export default handler;
