module.exports = {
	preset: 'jest-preset-angular',
	testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
	transform: {
		'^.+\\.(ts|js|html)$': 'ts-jest'
	},
	moduleNameMapper: {
		"@shared/(.*)": "<rootDir>/src/app/shared/$1",
		"@core/(.*)": "<rootDir>/src/app/core/$1",
	},
	setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
	collectCoverageFrom: ['<rootDir>/src/app/**/*.{ts,js}'],
	moduleFileExtensions: ['ts', 'js', 'html']
};
