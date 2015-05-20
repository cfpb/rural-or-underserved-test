module.exports = {
    css: {
        files: 'scss/**/*.scss',
        tasks: ['sass:dev']
    },
    livereload: {
        options: {
            livereload: '<%= connect.options.livereload %>'
        },
        files: [
            'css/**/*',
            '*.html'
        ]
    }
}