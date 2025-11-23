import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';

export default [
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parser: typescriptParser,
			ecmaVersion: 2020,
			sourceType: 'module',
		},
		plugins: {
			'@typescript-eslint': typescriptEslint,
		},
		rules: {
			...js.configs.recommended.rules,
			...typescriptEslint.configs.recommended.rules,
			'@typescript-eslint/no-unused-vars': 'error',
			'@typescript-eslint/explicit-function-return-type': 'warn',
			'no-console': 'warn',
		},
	},
	prettier,
	{
		ignores: [
			'node_modules/',
			'dist/',
			'build/',
			'coverage/',
			'*.min.js',
			'*.bundle.js',
		],
	},
];
