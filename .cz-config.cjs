module.exports = {
	types: [
		{
			value: 'feat',
			name: 'feat:     A new feature',
		},
		{
			value: 'fix',
			name: 'fix:      A bug fix',
		},
		{ value: 'docs', name: 'docs:     Documentation change' },
		{
			value: 'style',
			name: "style:    Don't affect code changes (formatting)",
		},
		{ value: 'refactor', name: 'refactor: Code refactoring' },
		{
			value: 'perf',
			name: 'perf:     Performance fixes',
		},
		{ value: 'test', name: 'test:     Adding or change tests' },
		{ value: 'ci', name: 'ci:       CI/CD changes' },
		{
			value: 'chore',
			name: 'chore:    Additional tools (build, add libraries, etc)',
		},
		{ value: 'revert', name: 'revert:   Revert to a commit' },
		{ value: 'WIP', name: 'WIP:      Work in progress' },
	],

	scopes: [
		{ name: 'dogma' },
		{ name: 'database' },
		{ name: 'tests' },
		{ name: 'docs' },
		{ name: 'config' },
	],

	messages: {
		type: 'Select the type of change:',
		scope: 'Select the scope (optional):',
		subject: 'Write a short description:\n',
		body: 'Detailed description (optional):\n',
		breaking: 'BREAKING CHANGES (optional):\n',
		footer: 'Issues to close (optional):\n',
		confirmCommit: 'Are you satisfied with the resulting commit?',
	},

	allowCustomScopes: false,
	allowBreakingChanges: ['feat', 'fix'],
	skipEmptyScopes: true,

	subjectLimit: 72,
};
