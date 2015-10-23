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
            }
        ]
    }
}