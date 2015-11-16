module.exports = {
  dev: {
    src : 'dist/js/cricket.js',
    options : {
      specs : 'test/specs.js'
    }
  },
  coverage: {
    src : 'dist/js/cricket.js',
    options : {
      specs : 'test/specs.js',

      template: require('grunt-template-jasmine-istanbul'),
      templateOptions: {
        coverage: 'coverage/coverage.json',
        report: 'coverage'
      }
    }
  }
}
