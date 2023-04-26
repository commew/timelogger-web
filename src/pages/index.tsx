import { Grid, Skeleton } from '@mantine/core';
import type { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { appUrls } from '@/features';
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: appUrls.login.path,
      },
    };
  }

  return {
    props: {},
  };
};

export default IndexPage;
