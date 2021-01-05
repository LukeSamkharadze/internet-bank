const path = require('path');

module.exports = {
  entry: './components/dropdown/core/logic/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, 'components/dropdown/core/logic')],
        use: 'ts-loader',
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'components/dropdown/core/logic/build'),
  },
};