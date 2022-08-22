module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	collectCoverage: true,
	coverageProvider: 'v8',
	transform: {
		'^.+\\.ts?$': 'ts-jest',
	},
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
};