import fs from 'fs'

import webpack from 'webpack'
import config from '../webpack.config.prod'
import { chalkError, chalkSuccess, chalkWarning, chalkProcessing } from './chalkConfig'

process.env.NODE_ENV = 'production'

const saveStats = process.argv[2] === '--progress'
const pathToStatsFile = 'stats.json'

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

    if (saveStats) {
        chalkProcessing(`Saving stats to file ${pathToStatsFile}`)
        fs.writeFile(pathToStatsFile, JSON.stringify(jsonStats), err => {
            if(err) {
                chalkError(`Error ${err}`)
            }

            chalkProcessing('The file was saved!')
        })
    }

    console.log(chalkSuccess('Compiled and stored at /dist.'))

    return 0
})
