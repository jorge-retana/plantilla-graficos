import { merge } from 'webpack-merge'

import common from './webpack.common.js'
import development from './webpack.development.js'
import production from './webpack.production.js'

const isProduction = process.env.NODE_ENV === 'production'

export default merge(common, isProduction ? production : development)
