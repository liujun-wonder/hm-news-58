module.exports = {
  devServer: {
    open: true,
    port: 8888
  },
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 36
          })
        ]
      }
    }
  }
};
