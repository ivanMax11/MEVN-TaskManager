const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://mevn-taskmanager.onrender.com',  // URL de tu servidor en Render
        changeOrigin: true,
      },
    },
  },
});
