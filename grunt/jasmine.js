module.exports = {
  dev: {
    src : [],
    options : {
      specs : 'test/specs.js',
      vendor: [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/jasmine-jquery/lib/jasmine-jquery.js'
      ],
      '--web-security': false,
      '--local-to-remote-url-access' : true
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
      vendor: [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/jasmine-jquery/lib/jasmine-jquery.js'
      ],
      '--web-security': false,
      '--local-to-remote-url-access' : true
    }
  }
}
