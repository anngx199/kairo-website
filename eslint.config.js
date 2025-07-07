import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import pluginPrettier from 'eslint-plugin-prettier'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      js,
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    ...pluginReact.configs.flat.recommended,
  },
])
