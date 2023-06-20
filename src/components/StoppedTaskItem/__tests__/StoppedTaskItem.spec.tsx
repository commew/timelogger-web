import { render, screen } from '@testing-library/react';
import { StoppedTaskItem } from '@/components';

describe('src/components/StoppedTaskItem/StoppedTaskItem.tsx TestCases', () => {
  it('should display the name', () => {
    const expected = 'カテゴリ名';

    render(
      <StoppedTaskItem
        categoryName="カテゴリ名"
        categoryGroupName="グループ名"
        isMeasuring={true}
      />
    );

    expect(screen.getByText(expected)).toBeTruthy();
  });
  // TODO: テストケースをちゃんと考える
});
