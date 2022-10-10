module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    plugins: ['import'],
    extends: [
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        project: __dirname + '/tsconfig.json',
    },
    rules: {
        '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/camelcase': 'off', // ElasticSearch client uses snake case,
        'sort-imports': ['error', { ignoreDeclarationSort: true }],
        'import/order': ['error', { 'newlines-between': 'always-and-inside-groups' }],
        'class-methods-use-this': 'off',
        'max-classes-per-file': 'off',
        'import/prefer-default-export': 'off',
        'no-console': 'off',
        'no-underscore-dangle': 'off', // ElasticSearch client uses snake case,
    },
    ignorePatterns: ['.eslintrc.js'],
};
