const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-basics/'
    : '/'
}

module.exports = {

  css: {

    loaderOptions: {

      scss: {

        additionalData: `@import "~@/styles.scss";`

      }

    }

  }

}