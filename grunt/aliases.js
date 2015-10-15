module.exports = {
    'default': [
        'sass:dev',
        'browserify',
        'copy:dev',
        'connect:livereload',
        'watch'
    ],
    'build': [
        'sass:build',
        'browserify',
        'copy:build',
        'uglify'
    ]
};