module.exports = {
  dev: {
    src : [],
    options : {
      specs : 'test/specs.js'
    }
  },
  coverage: {
    src : [],
    options : {
      specs : 'test/specs.js',
      template: require('grunt-template-jasmine-istanbul'),
      templateOptions: {
        coverage: 'coverage/coverage.json',
        report: 'coverage'
      },
      '--web-security': false,
      '--local-to-remote-url-access' : true
    }
  }
}
