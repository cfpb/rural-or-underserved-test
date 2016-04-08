module.exports = {
    css: {
        files: 'src/scss/**/*.scss',
        tasks: ['sass:dev']
    },
    v1: {
        files: ['src/css/**/*.css',
                'src/js/v1-non-responsive-header.js',
                'js/modernizr.v1build.js'],
        tasks: ['copy:dev']
    },
    scripts: {
        files: 'src/js/*.js',
        tasks: ['browserify:dev', 'browserify:specs', 'jasmine:dev']
    },
    html: {
        files: 'src/*.html',
        tasks: ['copy:dev']
    },
    livereload: {
        options: {
            livereload: '<%= connect.options.livereload %>'
        },
        files: [
            'dist/css/**/*',
            'dist/*.html',
            'dist/js/cricket.js'
        ]
    },
    specs: {
      files: 'test/*Spec.js',
      tasks: ['browserify:specs', 'jasmine:dev']
    }
}
