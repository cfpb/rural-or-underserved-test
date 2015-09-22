module.exports = {
    css: {
        files: 'src/scss/**/*.scss',
        tasks: ['sass:dev']
    },
    scripts: {
        files: 'src/js/*.js',
        tasks: ['browserify:dev']
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
    }
}