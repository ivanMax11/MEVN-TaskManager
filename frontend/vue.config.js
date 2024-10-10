const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/tu-subdirectorio/' : '/', // Cambia 'tu-subdirectorio' según sea necesario
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Cambia esto a tu API real
        changeOrigin: true,
      },
    },
  },
});
