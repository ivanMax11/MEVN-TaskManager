<template>
    <div>
      <h2>Register</h2>
      <form @submit.prevent="registerForm">
        <input v-model="username" type="text" placeholder="Username" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
      };
    },
    methods: {
      async registerForm() {
        try {
          const response = await axios.post('http://localhost:3000/api/register', {
            username: this.username,
            email: this.email,
            password: this.password,
          });
          console.log(response.data);
          this.$router.push('/login');
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  