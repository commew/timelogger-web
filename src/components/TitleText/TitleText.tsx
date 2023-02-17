import type { FC } from 'react';
import { Title } from '@mantine/core';

type Props = {
  title: string;
};

export const TitleText: FC<Props> = ({ title }) => {
  return <Title order={1}>{title}</Title>;
};
