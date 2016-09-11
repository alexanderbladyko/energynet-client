import webpack from 'webpack'
import webpackDevServer from 'webpack-dev-server'

import config from '../webpack.config.dev'

const bundler = webpack(config)


const server = new webpackDevServer(bundler, {
    hot: true,

    publicPath: config.output.publicPath,

    stats: { colors: true },

    noInfo: true,
})
server.listen(3000)
