<template>
    <div id="app">
      <header-component />
      <router-view />
      <footer-component />
    </div>
  </template>
  
  <script>
  import HeaderComponent from './components/HeaderComponent.vue';
  import FooterComponent from './components/FooterComponent.vue';
  import { mapMutations } from 'vuex'; // Cambia a mapMutations
  
  export default {
    name: 'App',
    components: {
      HeaderComponent,
      FooterComponent,
    },
    created() {
      this.checkAuthentication(); // Verificar autenticación al crear el componente
    },
    methods: {
      ...mapMutations(['setUser']), // Mapea la mutación desde Vuex
      checkAuthentication() {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        if (token && user) {
          this.setUser(user); // Establecer el usuario en Vuex
        }
      }
    }
  };
  </script>
  