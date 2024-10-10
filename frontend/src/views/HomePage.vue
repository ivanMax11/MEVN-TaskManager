<template>
    <div class="home">
      <div class="welcome-container">
        <h1>Welcome to the Task Manager App</h1>
        <p>Please log in or register to manage your tasks.</p>
        
        <div class="button-container">
          <router-link to="/login">
            <button class="btn">Login</button>
          </router-link>
          <router-link to="/register">
            <button class="btn">Register</button>
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
  };
  </script>
  
  <style scoped>
  .home {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(to bottom right, #6a82fb, #fc5c7d); /* Fondo atractivo */
  }
  
  .welcome-container {
    text-align: center;
    background: white;
    border-radius: 10px;
    padding: 40px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Sombra para el contenedor */
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 1.2rem;
    margin-bottom: 30px;
  }
  
  .button-container {
    display: flex;
    justify-content: center;
  }
  
  .btn {
    margin: 0 10px;
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;
    background-color: #6a82fb; /* Color de fondo del botón */
    color: white; /* Color del texto del botón */
    border: none;
    border-radius: 5px; /* Bordes redondeados */
    transition: background-color 0.3s ease; /* Efecto de transición */
  }
  
  .btn:hover {
    background-color: #fc5c7d; /* Color del botón al pasar el mouse */
  }
  </style>
  