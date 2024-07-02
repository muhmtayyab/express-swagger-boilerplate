module.exports = [
  {
    languageOptions: {
      globals: {
        module: 'readonly',
        console: 'readonly',
        require: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        setTimeout: 'readonly',
        localStorage: 'readonly',
        ui: 'readonly'
      }
    },
    ignores: [
      'node_modules/*'
    ],
    rules: {
      semi: 'error',
      'no-console': 'error',
      'prefer-const': 'error',
      'comma-dangle': [
        'error',
        'never'
      ],
      'quotes': ['error', 'single'],
      'import/no-named-as-default': 0,
      'import/no-named-as-default-member': 0,
      'import/extensions': 0,
      'no-await-in-loop': 0,
      'no-useless-escape': 0,
      'eqeqeq': 'warn',
      'no-console': 0,
      'no-plusplus': 0,
      'no-unused-vars': 'error',
      'no-underscore-dangle': 0,
      'no-restricted-syntax': 0,
      'no-loop-func': 0,
      'import/prefer-default-export': 0,
      'no-undef': 'error'
    }
  }
];
