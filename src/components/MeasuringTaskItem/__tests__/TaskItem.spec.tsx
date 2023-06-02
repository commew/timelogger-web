import { render, screen } from '@testing-library/react';
import { MeasuringTaskItem } from '@/components';

describe('src/components/MeasuringTaskItem/MeasuringTaskItem.tsx TestCases', () => {
  it('should display the name', () => {
    const expected = 'カテゴリ名';

    render(
      <MeasuringTaskItem
        categoryName="カテゴリ名"
        categoryGroupName="グループ名"
        isMeasuring={true}
      />
    );

    expect(screen.getByText(expected)).toBeTruthy();
  });
  // TODO: テストケースをちゃんと考える
});
