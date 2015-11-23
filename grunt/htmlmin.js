module.exports = {
  build: {
    options: {
      removeComments: true,
      collapseWhitespace: true
    },
    files: {
      'dist/index.html': 'src/index.html'
    }
  }
}
