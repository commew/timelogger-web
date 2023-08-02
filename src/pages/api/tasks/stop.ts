import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { stopTask } from '@/api/server/fetch/task';
import { httpStatusCode } from '@/features';
import type { Task } from '@/features';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

interface NextApiRequestWithStopTaskDto extends NextApiRequest {
  body: {
    taskId: number;
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

  if (!session) {
    res.status(httpStatusCode.unauthorized).json({
      type: 'UNAUTHENTICATED',
      title: 'Please set appToken in Authorization Header.',
    });

    return;
  }

  try {
    const stopTaskDto = { appToken: session.appToken, ...req.body };
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
