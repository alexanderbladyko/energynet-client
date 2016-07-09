import webpack from 'webpack'
import config from '../webpack.config.prod'
import { chalkError, chalkSuccess, chalkWarning, chalkProcessing } from './chalkConfig'

process.env.NODE_ENV = 'production'

console.log(chalkProcessing('Generating minified bundle for production via Webpack. This will take a moment...'))

webpack(config).run((error, stats) => {
    if (error) {
        console.log(chalkError(error))
        return 1
    }

    const jsonStats = stats.toJson()

    if (jsonStats.hasErrors) {
        return jsonStats.errors.map(statsError => console.log(chalkError(statsError)))
    }

    if (jsonStats.hasWarnings) {
        console.log(chalkWarning('Webpack generated the following warnings: '))
        jsonStats.warnings.map(warning => console.log(chalkWarning(warning)))
    }

    console.log(`Webpack stats: ${stats}`)

    console.log(chalkSuccess('Compiled and stored at /dist.'))

    return 0
})
