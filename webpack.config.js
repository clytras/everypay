const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  // entry: './src/index.js',
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   filename: 'my-first-webpack.bundle.js'
  // },
  mode: 'production',
  plugins: [
    new CopyPlugin([
      'src/',
      'docs/**/*',
      '.env.example',
    ]),
  ],
};
