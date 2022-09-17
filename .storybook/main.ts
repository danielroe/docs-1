import path from 'node:path';
import { StorybookConfig } from '@storybook/core-common';
import { Configuration } from 'webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import ResolveTypeScriptPlugin from 'resolve-typescript-plugin';

const config: StorybookConfig = {
  stories: ['../packages/*/src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
    {
      name: 'storybook-addon-next',
      options: {
        nextConfigPath: path.resolve(__dirname, 'next.config.cjs'),
      },
    },
    'storybook-dark-mode', // addon to have toolbar for dark/light mode
    'storybook-addon-swc',
  ],
  typescript: {
    reactDocgen: false,
  },
  env(config: Record<string, unknown>) {
    return {
      ...config,
      NEXT_PUBLIC_ALGOLIA_APP_ID: 'ANRJKXZTRW',
      NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY: 'a5522203ca95675199cc21edf09e6d75',
      NEXT_PUBLIC_ALGOLIA_INDEX_NAME: 'searchv2_main',
      __NEXT_IMAGE_OPTS: {
        experimentalFuture: true,
        experimentalUnoptimized: true,
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      },
    };
  },
  webpackFinal(config: Configuration) {
    config.resolve ||= {};
    config.resolve.plugins ||= [];
    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      }),
      new ResolveTypeScriptPlugin()
    );
    config.resolve.fallback = {
      ...config.resolve.fallback,
      url: false,
    };
    return config;
  },
  features: {
    previewMdx2: true,
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: { fastRefresh: true },
  },
};

export default config;