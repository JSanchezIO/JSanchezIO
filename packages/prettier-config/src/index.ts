import type { Config } from 'prettier';

const config = {
  plugins: [
    require.resolve('prettier-plugin-organize-imports'),
    require.resolve('prettier-plugin-packagejson'),
  ],
  printWidth: 100,
  proseWrap: 'always',
  singleQuote: true,
} satisfies Config;

export = config;
