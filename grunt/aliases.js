module.exports = {
    'default': [
        'sass:dev',
        'browserify:dev',
        'copy:dev',
        'connect:livereload',
        'watch'
    ],
    'build': [
        'sass:build',
        'browserify:dev',
        'copy:build',
        'htmlmin:build',
        'uglify'
    ]
};
