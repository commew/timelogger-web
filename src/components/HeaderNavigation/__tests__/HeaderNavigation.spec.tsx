import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { HeaderNavigation } from '@/components';

const renderWithTheme = (component: JSX.Element) => {
  return render(
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: 'light',
        colors: {
          timmew: ['#FADF7B'],
        },
      }}
    >
      {component}
    </MantineProvider>
  );
};

describe('src/components/HeaderNavigation/HeaderNavigation.tsx TestCases', () => {
  it('should display the link label', () => {
    renderWithTheme(<HeaderNavigation />);

    const linkLabels = ['計測', '集計', 'タスク履歴', '各種設定', 'ログアウト'];
    linkLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeTruthy();
    });
  });
});
