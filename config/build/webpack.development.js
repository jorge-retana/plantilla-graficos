import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import ReactRefreshTypescript from 'react-refresh-typescript'

import cssGetLocalIdent from './utils/cssGetLocalIdent.js'
import { ROOT_PATH } from './webpack.common.js'

export default {
  mode: 'development',
  devServer: {
    hot: true,
    port: process.env.APP_PORT || 3000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: `${ROOT_PATH}/config/typescript/tsconfig.json`,
            getCustomTransformers: () => ({ before: [ReactRefreshTypescript()] }),
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                getLocalIdent: cssGetLocalIdent,
              },
              importLoaders: 1,
            },
          },
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
  plugins: [new ReactRefreshWebpackPlugin()],
}
