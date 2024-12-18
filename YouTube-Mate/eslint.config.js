import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslint from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import importPlugin from 'eslint-plugin-import';
import eslintPluginImportX from 'eslint-plugin-import-x';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

export default tseslint.config(
	eslint.configs.recommended,
	importPlugin.flatConfigs.recommended,
	eslintPluginImportX.flatConfigs.recommended,
	eslintPluginImportX.flatConfigs.typescript,
	...tseslint.configs.strictTypeChecked, // a superset of recommended that includes more opinionated rules which may also catch bugs.
	...tseslint.configs.stylisticTypeChecked, // additional rules that enforce consistent styling without significantly catching bugs or changing logic.
	...svelte.configs['flat/recommended'],
	...svelte.configs['flat/prettier'],
	eslintPluginPrettierRecommended,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				NodeJS: true,
			},
		},
	},
	{
		ignores: [
			'.svelte-kit/',
			'build/',
			'/coverage*',
			'dist/',
			'docker-data/',
			'e2e/',
			'node_modules',
			'package/',
			'src/lib/i18n/*.ts',
			'src/demo.*.ts',
			'*.cjs',
			'*.config.js',
			'*.config.ts',
			'*.lock',
			'*-lock.*',
			'.DS_Store',
			'.env',
			'.env.*',
			'prisma/',
		],
	},
	{
		files: ['**/*.svelte', '*.svelte', '**/*.ts', '*.ts', '**/*.js', '*.js', '*.cjs'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				ecmaVersion: 'latest',
				sourceType: 'module',
				extraFileExtensions: ['.cjs', '.js', '.ts', '.svelte'],
				tsconfigRootDir: import.meta.dirname,
				parser: tseslint.parser,
				svelteConfig,
			},
		},
		rules: {
			'@typescript-eslint/no-throw-literal': 0,
			'arrow-body-style': ['error', 'as-needed'],
			'import/extensions': 0,
			'import/no-dynamic-require': 'warn',
			'import/no-extraneous-dependencies': 0,
			'import/no-mutable-exports': 0,
			'import/no-nodejs-modules': 'warn',
			'import/prefer-default-export': 0,
			'no-param-reassign': 0,
			'no-restricted-imports': ['error', { paths: ['$env/static/private'] }],
			'no-self-assign': 0,
			'no-unused-vars': 'off',
			'prefer-arrow-callback': ['error', { allowNamedFunctions: false, allowUnboundThis: true }],
		},
	}
);
