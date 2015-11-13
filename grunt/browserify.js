module.exports = {
    dev: {
        files: {
            'dist/js/cricket.js': ['src/js/app.js']
        },
        options: {
          browserifyOptions: {
            debug: true
          }
        }
    },
    specs: {
      files: {
        'test/specs.js': ['test/*Specs.js']
      }
    }
}
