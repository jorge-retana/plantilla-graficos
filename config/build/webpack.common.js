import Dotenv from 'dotenv-webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import { fileURLToPath } from 'url'

export const ROOT_PATH = fileURLToPath(new URL('../..', import.meta.url))

export default {
  entry: `${ROOT_PATH}/src/index.tsx`,
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset',
      },
      {
        test: /\.svg$/,
        loader: '@svgr/webpack',
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: `${ROOT_PATH}/config/style/postcss.config.cjs`,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: `${ROOT_PATH}/config/typescript/tsconfig.json`,
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: `${ROOT_PATH}/public/index.html` }),
    new Dotenv({ safe: true }),
  ],
  output: {
    filename: 'main.[contenthash].js',
    path: `${ROOT_PATH}/build`,
    clean: true,
  },
}
