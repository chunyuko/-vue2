module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      // '@vue/app',
      {
        polyfills: ['es6.promise', 'es6.symbol'],
        useBuiltIns: 'entry',
        corejs: '3.8.3',
        modules: false,
      },
    ],
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'entry',
        corejs: '3.8.3',
        targets: { node: 'current', browsers: ['ie 11'] },
      },
    ],
    ['@vue/babel-preset-jsx'],
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        // styleLibraryName: 'theme-chalk',
        style: false,
        // ext: '.scss',
      },
    ],
  ],
}
