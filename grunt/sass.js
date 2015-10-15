module.exports = {
    dev: {
        options: {
            sourceMap: true
        },
        files: {
            'dist/css/cricket.css': 'src/scss/cricket.scss'
        }
    },
    build: {
        options: {
            outputStyle: 'compressed'
        },
        files: {
            'dist/css/cricket.css': 'src/scss/cricket.scss'
        }
    }
}