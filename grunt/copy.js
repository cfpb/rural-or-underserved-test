module.exports = {
    dev: {
        files: [
            {
                cwd: 'src/',
                src: ['img/*'],
                dest: 'dist/',
                expand: true
            },
            {
                cwd: 'src/',
                src: ['js/modernizr.v1build.js'],
                dest: 'dist/',
                expand: true
            },
            {
                cwd: 'src/',
                src: ['js/header.nonresponsive.js'],
                dest: 'dist/',
                expand: true
            },
            {
                cwd: 'src/',
                src: ['*.html'],
                dest: 'dist/',
                expand: true,
                flatten: true
            },
            {
                cwd: 'src/',
                src: ['fonts/*'],
                dest: 'dist/',
                expand: true,
            },
            {
                cwd: 'src/',
                src: ['data/*'],
                dest: 'dist/',
                expand: true,
            },
            {
                cwd: 'src/',
                src: ['csv-template.csv'],
                dest: 'dist/',
                expand: true,
            },
            {
                cwd: 'src/',
                src: ['css/*'],
                dest: 'dist/',
                expand: true,
            }
        ]
    },
    build: {
        files: [
            {
                cwd: 'src/',
                src: ['img/*'],
                dest: 'dist/',
                expand: true
            },
            {
                cwd: 'src/',
                src: ['js/modernizr.v1build.js'],
                dest: 'dist/',
                expand: true
            },
            {
                cwd: 'src/',
                src: ['js/header.nonresponsive.js'],
                dest: 'dist/',
                expand: true
            },
            {
                cwd: 'src/',
                src: ['fonts/*'],
                dest: 'dist/',
                expand: true,
            },
            {
                cwd: 'src/',
                src: ['data/*'],
                dest: 'dist/',
                expand: true,
            },
            {
                cwd: 'src/',
                src: ['csv-template.csv'],
                dest: 'dist/',
                expand: true,
            },
            {
                cwd: 'src/',
                src: ['css/*'],
                dest: 'dist/',
                expand: true,
            }
        ]
    }
}
