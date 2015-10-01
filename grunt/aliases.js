module.exports = {
    'default': [
        'sass:dev',
        'browserify:dev',
        'copy:dev',
        'connect:livereload',
        'watch'
    ],
    'build': [
        'sass:dev',
        'browserify:dev',
        'copy:build'
    ]
};