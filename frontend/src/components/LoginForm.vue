<template>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="loginForm" class="login-form">
            <input v-model="email" type="email" placeholder="Email" required />
            <input v-model="password" type="password" placeholder="Password" required />
            <button type="submit">Login</button>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p> <!-- Mensaje de error -->
        </form>
    </div>
</template>


<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            email: '',
            password: '',
            errorMessage: null,
        };
    },
    methods: {
        ...mapActions(['login']), // Mapea la acción de login desde Vuex
        async loginForm() {
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.email,
                password: this.password,
            }),
        });

        if (!response.ok) {
            if (response.status === 401) {
                this.errorMessage = 'Invalid email or password.';
            } else {
                this.errorMessage = 'Login failed. Please try again.';
            }
            return; // Evita continuar si hay un error
        }

        const userData = await response.json();
        if (userData.token && userData.user) {
            this.login(userData); // Llama a la acción de Vuex
            localStorage.setItem('token', userData.token);
            localStorage.setItem('user', JSON.stringify(userData.user)); // Guarda el objeto usuario

            this.email = '';
            this.password = ''; // Limpiar el formulario
            this.$router.push('/dashboard'); // Redirige al dashboard después de logearse
        } else {
            this.errorMessage = 'Invalid login response';
        }
    } catch (error) {
        this.errorMessage = 'Login failed. Please try again.';
    }
}


    },
};
</script>



<style scoped>
.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f5f5f5;
}

h2 {
    color: #007BFF;
    margin-bottom: 20px;
    font-size: 28px;
}

.login-form {
    background-color: #F9F9F9F9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    display: flex;
    flex-direction: column;
}

input {
    margin-bottom: 15px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
}

button {
    padding: 12px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #0056b3;
}

.error-message {
    color: red;
    margin-top: 10px;
    font-size: 14px;
}

input:focus,
button:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>
