module.exports = {
    'default': [
        'sass:dev',
        'browserify:dev',
        'connect:livereload',
        'watch'
    ],
    'build': [
        'sass:dev',
        'browserify:dev',
        'copy:build'
    ]
};