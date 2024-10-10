<template>
    <nav>
      <div class="nav-container">
        <h1>MEVN Task App</h1>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li v-show="!isAuthenticated"><router-link to="/login">Login</router-link></li>
          <li v-show="!isAuthenticated"><router-link to="/register">Register</router-link></li>
          <li v-show="isAuthenticated"><button @click="handleLogout">Logout</button></li>
        </ul>
      </div>
    </nav>
  </template>
  
  
  <script>
  import { mapState, mapActions } from 'vuex';
  
  export default {
    computed: {
      ...mapState(['isAuthenticated']),
    },
    methods: {
      ...mapActions(['logout']),
      handleLogout() {
        this.logout();
        this.$router.push('/'); // Redirige a la página de inicio después de cerrar sesión
      },
    },
  };
  </script>
  
  
    
  <style scoped>
  nav {
    background-color: #2c3e50;
    padding: 15px 30px;
  }
  
  .nav-container {
    text-align: justify; /* Para alinear el contenido en el contenedor */
  }
  
  h1 {
    color: #ecf0f1;
    font-size: 22px;
    font-weight: bold;
    margin: 0; /* Eliminar margen para evitar desalineación */
    display: inline-block; /* Para que se comporte como un bloque, pero en línea */
  }
  
  ul {
    list-style-type: none;
   
    padding: 0; /* Eliminar padding para un mejor alineamiento */
    display: inline-block; /* Para alinear horizontalmente */
  }
  
  li {
    margin: 0 15px; /* Espacio horizontal entre elementos */
    display: inline-block; /* Para que los li se alineen horizontalmente */
  }
  
  a, button {
    color: #ecf0f1;
    text-decoration: none;
    background-color: #34495e;
    padding: 8px 15px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  a:hover, button:hover {
    background-color: #1abc9c;
    transform: translateY(-2px); /* Pequeño efecto de elevación */
  }
  
  button {
    background-color: transparent; /* Botón sin fondo */
  }
  
  @media (max-width: 768px) {
    .nav-container {
      text-align: left; /* Alinear a la izquierda en pantallas pequeñas */
    }
  
    ul {
      display: block; /* Cambiar a bloque para mejor ajuste */
    }
  
    li {
      display: block; /* Colocar los elementos uno debajo del otro */
      margin-bottom: 10px; /* Espacio entre los elementos */
    }
  }
  </style>
  
    