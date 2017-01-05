/// <reference path="./index.d.ts" />

var mapboxgl = require('mapbox-gl')

module.exports = {
    setAccessToken: function() {
        mapboxgl.accessToken = 'pk.eyJ1Ijoic2FuZWNoZWt6IiwiYSI6ImNpeGtqazMyejAwMW8zMnFiaTludmV5cTYifQ.Rl_reKJcARpPotjUBeQrnQ'
    }
}
