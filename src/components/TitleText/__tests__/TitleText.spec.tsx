import { render, screen } from '@testing-library/react';
import { TitleText } from '@/components';

describe('src/components/TitleText/TitleText.tsx TestCases', () => {
  it('should display the title', () => {
    const expected = 'This is My Cat!';

    render(<TitleText title="This is My Cat!" />);

    expect(screen.getByText(expected)).toBeTruthy();
  });
});
