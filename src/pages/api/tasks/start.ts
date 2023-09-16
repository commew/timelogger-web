import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { startTask } from '@/api/server/fetch/task';
import { httpStatusCode, isNextApiRequestBodyOfStartTaskDto } from '@/features';
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
    if (!isNextApiRequestBodyOfStartTaskDto(req.body)) {
      res.status(httpStatusCode.badRequest).json({
        type: 'BAD_REQUEST',
        title: 'Invalid request body.',
      });

      return;
    }

    const startTaskDto = { appToken: session.appToken, ...req.body };
    const startedTask = await startTask(startTaskDto);

    res.status(httpStatusCode.ok).json(startedTask);
  } catch (error) {
    res.status(httpStatusCode.internalServerError).json({
      type: 'INTERNAL_SERVER_ERROR',
      title: 'Internal Server Error.',
    });
  }
};

export default handler;
