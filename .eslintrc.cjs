module.exports = {
  root: true,
  ignorePatterns: ['__fixtures__'],
  extends: [
    '@theguild',
    '@theguild/eslint-config/react',
    '@theguild/eslint-config/json',
    '@theguild/eslint-config/yml',
    // '@theguild/eslint-config/mdx',
    'plugin:tailwindcss/recommended',
    'plugin:storybook/recommended',
  ],
  rules: {
    'tailwindcss/classnames-order': 'off', // conflicts with official prettier-plugin-tailwindcss and tailwind v3
    // set more strict to highlight in editor
    'tailwindcss/enforces-shorthand': 'error',
    'tailwindcss/migration-from-tailwind-2': 'error',
    'tailwindcss/no-custom-classname': 'error',
    'prefer-destructuring': ['error', { object: true }],
    'prefer-template': 'error',
    '@typescript-eslint/array-type': ['error', { readonly: 'generic' }],
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'no-type-imports' }],

    // TODO: fix below
    '@typescript-eslint/no-explicit-any': 'warn',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn',
    // enable without breaking existing iframes
    'react/iframe-missing-sandbox': 'off',
  },
  settings: {
    tailwindcss: {
      config: 'tailwind.config.cjs',
      whitelist: [
        // TODO: find a way to fix it and remove these classes since they are imported somewhere and are used
        'line',
        'aa-ItemLink',
        'aa-ItemContent',
        'aa-ItemContentBody',
        'aa-ItemContentTitle',
        'aa-ItemContentSubtitle',
        'aa-SourceHeader',
        'aa-SourceHeaderTitle',
      ],
    },
  },
  overrides: [
    {
      files: ['**/*.stories.tsx'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['packages/**'],
      excludedFiles: ['packages/algolia/**'],
      rules: {
        'import/extensions': ['error', { js: 'never', json: 'always' }],
      },
    },
  ],
};
