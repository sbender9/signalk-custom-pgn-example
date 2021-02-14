const canboatMappings = require('./pgns.json')
const n2kMappings = require('./n2k-signalk')

module.exports = function(app) {
  var plugin = {}
  var unsubscribes = []

  plugin.id = "custom-pgn-example"
  plugin.name = "Custom Pgn Example"
  plugin.description = "Custom Pgn Example"

  function registerCanboatPGNs(emitter) {
    app.emitPropertyValue('canboat-custom-pgns', canboatMappings)
  }

  function registerN2KSKPGNs(emitter) {
    app.emitPropertyValue('pgn-to-signalk', n2kMappings)
    /*
    Object.keys(n2kMappings).forEach(key => {
      app.emit('pgn-to-signalk', key, n2kMappings[key])
    })
    */
  }

  plugin.start = function(options) {
    registerCanboatPGNs(app)
    app.on('canboat-custom-pgn-available', () => {
      registerCanboatPGNs(app)
    })

    registerN2KSKPGNs(app)
    app.on('pgn-to-signalk-available', () => {
      registerN2KSKPGNs(app)
    })
  }

  plugin.stop = function() {
  }

  plugin.schema = {
    title: "Test Plugin",
    type: "object",
    properties: {
    }
  }

  return plugin
}

