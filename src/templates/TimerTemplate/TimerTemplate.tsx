import type { FC } from 'react';
import { MeasuringTaskItem } from '@/components';
import { DefaultLayout } from '@/layouts';

export const TimerTemplate: FC = () => {
  return (
    <DefaultLayout>
      <MeasuringTaskItem
        categoryName="Category"
        categoryGroupName="Category Group"
        isMeasuring={true}
      />
      <MeasuringTaskItem
        categoryName="Category"
        categoryGroupName="Category Group"
        isMeasuring={true}
      />
      <MeasuringTaskItem
        categoryName="Category"
        categoryGroupName="Category Group"
        isMeasuring={true}
      />
    </DefaultLayout>
  );
};
