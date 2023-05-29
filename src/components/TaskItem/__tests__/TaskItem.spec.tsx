import { render, screen } from '@testing-library/react';
import { TaskItem } from '@/components';

describe('src/components/TaskItem/TaskItem.tsx TestCases', () => {
  it('should display the name', () => {
    const expected = 'カテゴリ名';

    render(
      <TaskItem
        categoryName="カテゴリ名"
        categoryGroupName="グループ名"
        isMeasuring={true}
      />
    );

    expect(screen.getByText(expected)).toBeTruthy();
  });
  // TODO: テストケースをちゃんと考える
});
