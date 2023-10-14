import { MantineProvider } from '@mantine/core';
import { render, screen, fireEvent } from '@testing-library/react';
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
  it('renders the HeaderNavigation component', () => {
    const handleLogout = jest.fn();
    renderWithTheme(<HeaderNavigation handleLogout={handleLogout} />);

    const linkLabels = ['計測'];
    linkLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeTruthy();
    });
    const logoutBtn = screen.getByRole('button', { name: 'ログアウト' });
    expect(logoutBtn).toBeTruthy();
  });

  it('calls the handleLogout function when the logout button is clicked', () => {
    const handleLogout = jest.fn();
    renderWithTheme(<HeaderNavigation handleLogout={handleLogout} />);

    const logoutBtn = screen.getByRole('button', { name: 'ログアウト' });
    fireEvent.click(logoutBtn);
    expect(handleLogout).toHaveBeenCalledTimes(1);
  });
});
