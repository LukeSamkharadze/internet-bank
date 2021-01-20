const path = require('path');

module.exports = {
  mode: "production",
  entry: './components/dropdown/core/logic/index.ts',
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
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
    filename: 'index.js',
    path: path.resolve(__dirname, 'components/dropdown/core/logic/build'),
  },
};