import { render, screen } from '@testing-library/react';
import { TaskMeasurementCategoryButton } from '@/components';

describe('src/components/TaskMeasurementCategoryButton/TaskMeasurementCategoryButton.tsx TestCases', () => {
  it('should display the name', () => {
    const expected = 'カテゴリ名';

    render(<TaskMeasurementCategoryButton name="カテゴリ名" />);

    expect(screen.getByText(expected)).toBeTruthy();
  });
  // TODO: テストケースをちゃんと考える
});
