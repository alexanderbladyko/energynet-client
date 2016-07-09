var exec = require('child_process').exec


exec('node -v', function (err, stdout) {
    if (err) throw err
    if (parseFloat(stdout) < 4) {
        throw new Error('ERROR: Energynet requires node 4.0 or greater.')
    }
})
