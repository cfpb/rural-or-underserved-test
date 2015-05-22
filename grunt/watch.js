module.exports = {
    css: {
        files: 'scss/**/*.scss',
        tasks: ['sass:dev']
    },
    scripts: {
        files: 'js/app.js',
        tasks: ['browserify:dev']
    },
    livereload: {
        options: {
            livereload: '<%= connect.options.livereload %>'
        },
        files: [
            'css/**/*',
            '*.html',
            'js/cricket.js'
        ]
    }
}