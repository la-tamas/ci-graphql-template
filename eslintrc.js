const rules = require('./eslint_rules');

module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
    extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
    rules,
}