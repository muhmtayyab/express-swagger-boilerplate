import path from 'path';
import nodeExternals from 'webpack-node-externals';

const config = {
  entry: ['babel-polyfill', path.resolve(__dirname, 'index.js')],
  mode: 'production',
  output: {
    path: path.join(__dirname, './dist'),
    publicPath: '//',
    filename: 'index.js'
  },
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false // and __filename return blank or /
  },
  externals: [nodeExternals()], // Need this to avoid error when working with Express
  module: {
    rules: [
      {
        // Transpile ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};

export default config;
