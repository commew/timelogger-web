import { render, screen } from '@testing-library/react';
import { CategoryButton } from '@/components';

describe('src/components/CategoryButton/CategoryButton.tsx TestCases', () => {
  it('should display the name', () => {
    const expected = 'カテゴリ名';

    render(<CategoryButton name="カテゴリ名" />);

    expect(screen.getByText(expected)).toBeTruthy();
  });
  // TODO: テストケースをちゃんと考える
});
