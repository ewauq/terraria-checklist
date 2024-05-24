const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: '@import "src/style/theme.scss";',
            },
          },
        ],
      },
      {
        test: /\.(js|jsx|tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './src/image/icon/favicon.png',
      template: './src/index.html',
    }),
    new webpack.DefinePlugin({
      __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/image/armor', to: 'image/armor' },
        { from: 'src/image/artwork', to: 'image/artwork' },
        { from: 'src/image/entity', to: 'image/entity' },
        { from: 'src/image/logo', to: 'image/logo' },
        { from: 'src/image/relic', to: 'image/relic' },
        { from: 'src/image/trophy', to: 'image/trophy' },
      ],
    }),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'image/icon/[name][ext][query]',
  },
}
