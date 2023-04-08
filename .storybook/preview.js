import { initialize, mswDecorator } from 'msw-storybook-addon';
import { addDecorator } from '@storybook/react';
import { MantineProvider } from '@mantine/core';

addDecorator((storyFn) => (
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
    {storyFn()}
  </MantineProvider>
));

initialize();

export const decorators = [mswDecorator];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
