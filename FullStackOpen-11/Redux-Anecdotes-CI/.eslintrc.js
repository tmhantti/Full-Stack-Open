module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es2021': true,
        'node': false,
        "jest/globals": true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'parser': '@babel/eslint-parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',        
        'ecmaFeatures': {
            'jsx': true 
        }
    },
    'plugins': [
        'react',
        'jest'
    ],
    'settings': {
        'react': {
            'version': 'detect'
        }
    },
    'rules': {
        'react/react-in-jsx-scope': 'off',        
        'indent': [
            'error',
            2
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'        
        ],
        'eqeqeq': 'error',
        'no-console': 0,
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [
            'error', 'always'
        ],
        'arrow-spacing': [
            'error', { 'before': true, 'after': true }
        ]        
    }
}
