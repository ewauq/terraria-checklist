const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const Meta = {
  Title: 'Progression Checklist for Terraria 1.4',
  Description: "Track your progress on a single page on any devices so you don't miss anything!",
  Keywords: [
    'terraria',
    'checklist',
    'help',
    'progression',
    'walkthrough',
    'tracking',
    'bosses',
    'items',
    'weapons',
    'collection',
  ],
}

module.exports = {
  mode: 'development',
  entry: './src/main.tsx',
  devtool: 'inline-source-map',
  output: { path: path.join(__dirname, '/dist'), filename: 'bundle.js' },
  devtool: 'inline-source-map',
  devServer: { static: './dist' },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: [{ loader: 'style-loader' }, { loader: 'css-loader' }] },
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource' },
    ],
  },
  resolve: { extensions: ['.tsx', '.ts', '.js'] },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './src/static/media/favicon.png',
      template: './src/index.html',
    }),
    new HtmlWebpackTagsPlugin({
      metas: [
        {
          attributes: {
            name: 'title',
            content: Meta.Title,
          },
        },
        {
          attributes: {
            name: 'description',
            content: Meta.Description,
          },
        },
        {
          attributes: {
            name: 'keywords',
            content: Meta.Keywords.join(','),
          },
        },
        {
          attributes: {
            property: 'og:title',
            content: Meta.Title,
          },
        },
        {
          attributes: {
            property: 'og:description',
            content: Meta.Description,
          },
        },
        {
          attributes: {
            name: 'twitter:title',
            content: Meta.Title,
          },
        },
        {
          attributes: {
            name: 'twitter:description',
            content: Meta.Description,
          },
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'src/static', to: 'static' }],
    }),
  ],
  performance: {
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000,
  },
}
