const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './main.tsx',
  devtool: 'inline-source-map',
  output: { path: path.join(__dirname, '/dist'), filename: 'bundle.js' },
  devtool: 'inline-source-map',
  devServer: { static: './dist' },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
    ],
  },
  resolve: { extensions: ['.tsx', '.ts', '.js'] },
  plugins: [
    // new HtmlWebpackPlugin({ template: './index.html' }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        description:
          "Track your progress on a single page on any devices so you don't miss anything!",
        'twitter:description':
          "Track your progress on a single page on any devices so you don't miss anything!",
        'og:description':
          "Track your progress on a single page on any devices so you don't miss anything!",
        // https://stackoverflow.com/questions/43018983/how-to-inject-custom-meta-tags-in-html-webpack-plugin
      },
    }),
  ],
  performance: {
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000,
  },
}
