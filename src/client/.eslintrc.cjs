module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: [
        'eslint-plugin-prefer-arrow',
        'eslint-plugin-import',
        'eslint-plugin-unicorn',
        'eslint-plugin-jsdoc',
        'eslint-plugin-react',
        'react-hooks',
        '@typescript-eslint',
        'unused-imports',
    ],
    settings: {
        react: {
            version: '18.2.0',
        },
    },
    rules: {
        'space-infix-ops': 'error',
        '@typescript-eslint/space-infix-ops': 'warn',
        'keyword-spacing': [
            'error',
            {
                before: true,
                after: true,
            },
        ],
        'react-hooks/rules-of-hooks': 'error',
        // "react-hooks/exhaustive-deps": "warn",
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': [
            'error',
            {
                default: 'array',
            },
        ],
        '@typescript-eslint/ban-ts-comment': 'error',
        '@typescript-eslint/ban-types': [
            'error',
            {
                types: {
                    Object: {
                        message: 'Use {} instead.',
                    },
                    'Array<([A-Za-z0-9_]+)>': {
                        message: 'Use %someType%[] syntax instead.',
                    },
                    Function: null,
                },
            },
        ],
        '@typescript-eslint/dot-notation': 'error',
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'semi',
                    requireLast: true,
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: false,
                },
            },
        ],
        '@typescript-eslint/member-ordering': 'error',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'enumMember',
                format: ['UPPER_CASE'],
            },
        ],
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-this-alias': 'error',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/quotes': ['error', 'single'],
        '@typescript-eslint/semi': ['error', 'always'],
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/unified-signatures': 'error',
        '@typescript-eslint/explicit-function-return-type': 'error',
        'arrow-body-style': 'error',
        'brace-style': ['error', '1tbs'],
        'capitalized-comments': ['error', 'always'],
        complexity: [
            'error',
            {
                max: 20,
            },
        ],
        'constructor-super': 'error',
        curly: 'error',
        'default-case': 'error',
        'eol-last': 'error',
        eqeqeq: ['error', 'always'],
        'id-blacklist': [
            'error',
            'any',
            'Number',
            'number',
            'String',
            'string',
            'Boolean',
            'boolean',
            'Undefined',
            'undefined',
        ],
        'id-match': 'error',
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: false,
            },
        ],
        'import/order': 'error',
        'jsdoc/require-jsdoc': [
            'error',
            {
                require: {
                    FunctionDeclaration: true,
                    MethodDefinition: true,
                    ClassDeclaration: true,
                    ArrowFunctionExpression: true,
                    FunctionExpression: true,
                },
                contexts: [
                    'TSInterfaceDeclaration',
                    'TSEnumDeclaration',
                    'TSPropertySignature',
                    'TSMethodSignature',
                    'TSTypeAliasDeclaration',
                ],
                publicOnly: false,
            },
        ],
        'jsdoc/require-description-complete-sentence': 'error',
        'jsdoc/require-param': 1,
        'jsdoc/check-alignment': 'error',
        'jsdoc/check-indentation': 'error',
        'jsdoc/newline-after-description': 'error',
        'jsdoc/no-types': 'off',
        'linebreak-style': ['error', 'unix'],
        'max-classes-per-file': ['error', 3],
        'max-len': [
            'error',
            {
                code: 120,
                ignorePattern: '^import .*',
            },
        ],
        'max-lines': ['error', 1000],
        'new-parens': 'error',
        'no-cond-assign': 'error',
        'no-console': 'error',
        'no-debugger': 'error',
        'no-duplicate-case': 'error',
        'no-duplicate-imports': 'error',
        'no-empty': 'off',
        'no-extra-bind': 'error',
        'no-irregular-whitespace': 'error',
        'no-multiple-empty-lines': [
            'error',
            {
                max: 1,
            },
        ],
        'no-redeclare': 'error',
        'no-sparse-arrays': 'error',
        'no-template-curly-in-string': 'error',
        'no-throw-literal': 'error',
        'no-trailing-spaces': [
            'error',
            {
                ignoreComments: true,
            },
        ],
        //"no-underscore-dangle": "warning",
        'no-unused-labels': 'error',
        'no-var': 'error',
        'one-var': ['error', 'never'],
        'padding-line-between-statements': [
            'error',
            {
                blankLine: 'always',
                prev: '*',
                next: 'return',
            },
        ],
        'prefer-arrow/prefer-arrow-functions': [
            'error',
            {
                allowStandaloneDeclarations: true,
            },
        ],
        'prefer-const': [
            'error',
            {
                destructuring: 'all',
            },
        ],
        'prefer-object-spread': 'error',
        'prefer-template': 'error',
        'quote-props': ['error', 'as-needed'],
        'react/jsx-boolean-value': ['error', 'never'],
        'react/jsx-curly-spacing': [
            'error',
            {
                when: 'never',
            },
        ],
        'react/jsx-equals-spacing': ['error', 'never'],
        'react/jsx-key': 'error',
        'react/jsx-no-bind': ['error', { allowArrowFunctions: true }],
        'react/jsx-tag-spacing': [
            'error',
            {
                afterOpening: 'allow',
                closingSlash: 'allow',
            },
        ],
        'react/self-closing-comp': 'error',
        'space-before-function-paren': ['error', { anonymous: 'never', named: 'never', asyncArrow: 'always' }],
        'spaced-comment': [
            'error',
            'always',
            {
                markers: ['/'],
            },
        ],
        'unicorn/filename-case': [
            'error',
            {
                case: 'pascalCase',
                ignore: ['XHRLayout.ts', 'WSService.ts', 'SMSCodeForm.tsx'],
            },
        ],
        'use-isnan': 'error',
        'no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
            'warn',
            {
                vars: 'all',
                args: 'after-used',
            },
        ],
    },
};
