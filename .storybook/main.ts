import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@pages': path.resolve(__dirname, '../src/pages'),
        '@components': path.resolve(__dirname, '../src/components'),
        '@ui': path.resolve(__dirname, '../src/components/ui'),
        '@ui-pages': path.resolve(__dirname, '../src/components/ui/pages'),
        '@utils-types': path.resolve(__dirname, '../src/utils/types'),
        '@api': path.resolve(__dirname, '../src/utils/burger-api.ts'),
        '@slices': path.resolve(__dirname, '../src/services/slices'),
        '@selectors': path.resolve(__dirname, '../src/services/selectors'),
      };
    }
    return config;
  },
};
export default config;

