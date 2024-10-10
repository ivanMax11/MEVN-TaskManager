import { createStore } from 'vuex';

const store = createStore({
    state: {
        user: JSON.parse(localStorage.getItem('user')) || null, // Cargar el usuario desde localStorage
        isAuthenticated: !!localStorage.getItem('token'), // Verifica si hay un token para determinar autenticación
        tasks: []
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            state.isAuthenticated = !!user; // Actualiza el estado de autenticación
        },
        setTasks(state, tasks) {
            state.tasks = tasks;
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false; // Actualiza el estado de autenticación al cerrar sesión
        }
    },
    actions: {
        async login({ commit }, user) {
            commit('setUser', user); // Actualiza el estado de usuario
        },
        async fetchTasks({ commit }) {
            const tasks = await fetch('/api/tasks').then(res => res.json());
            commit('setTasks', tasks);
        },
        logout({ commit }) {
            localStorage.removeItem('token'); // Elimina el token
            localStorage.removeItem('user'); // Elimina los datos del usuario
            commit('logout'); // Llama a la mutación de logout
        }
    }
});

export default store;
