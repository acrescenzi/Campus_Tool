const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// Constant with our paths
const paths = {
  DIST: path.resolve(__dirname, 'src'),
  SRC: path.resolve(__dirname, 'src'), // source folder path ->
  JS: path.resolve(__dirname, 'src'),
};
// Webpack configuration
module.exports = {
  entry: path.join(paths.JS, 'index.jsx'),
  output: {
    path: paths.DIST,
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader'
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      }
    ]
},
  resolve: {
      extensions: ['.js', '.jsx'],
    },
  };
