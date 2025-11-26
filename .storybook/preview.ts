import { INITIAL_VIEWPORTS } from 'storybook/viewport';
import type { Preview } from '@storybook/nextjs';
import { initialize, mswLoader } from 'msw-storybook-addon';
import '../src/app/globals.css';

/*
 * Initializes MSW
 * See https://github.com/mswjs/msw-storybook-addon#configuring-msw
 * to learn how to customize it
 */
initialize();

const preview: Preview = {
  // 👈 Add the MSW loader to all stories
  loaders: [mswLoader],

  parameters: {
    viewport: {
      options: INITIAL_VIEWPORTS
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },

  initialGlobals: {
    viewport: {
      value: 'desktop',
      isRotated: false
    }
  }
};

export default preview;