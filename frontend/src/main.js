import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Importa el router si lo tienes configurado
import store from './store';    // Importa Vuex store

const app = createApp(App);

// Usar Vuex y Vue Router
app.use(router);
app.use(store);

app.mount('#app');
