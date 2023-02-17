import { Grid, Skeleton } from '@mantine/core';
import type { NextPage } from 'next';
import { DefaultLayout } from '@/layouts';

const child = <Skeleton height={140} radius="md" animate={false} />;

const IndexPage: NextPage = () => {
  return (
    <DefaultLayout>
      <Grid>
        <Grid.Col xs={4}>{child}</Grid.Col>
        <Grid.Col xs={8}>{child}</Grid.Col>
        <Grid.Col xs={8}>{child}</Grid.Col>
        <Grid.Col xs={4}>{child}</Grid.Col>
        <Grid.Col xs={3}>{child}</Grid.Col>
        <Grid.Col xs={3}>{child}</Grid.Col>
        <Grid.Col xs={6}>{child}</Grid.Col>
      </Grid>
    </DefaultLayout>
  );
};

export default IndexPage;
