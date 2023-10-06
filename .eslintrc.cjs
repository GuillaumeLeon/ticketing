module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier',
		'airbnb',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'prettier'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
	rules: {
		indent: 'off',
		// removed so that prettier indentation is used only (they always clash)
		// '@typescript-eslint/indent': ['error', 4], // removed so that prettier indentation is used only (they always clash)
		'no-use-before-define': 'off',
		'@typescript-eslint/no-use-before-define': ['error'],
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				ts: 'never',
			},
		],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['error'],
		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': ['error'],
		'import/prefer-default-export': 'off',
		'no-param-reassign': [
			'error',
			{
				props: true,
				ignorePropertyModificationsFor: ['state'],
			},
		],
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.ts', '.d.ts'],
			},
		},
	},
};
