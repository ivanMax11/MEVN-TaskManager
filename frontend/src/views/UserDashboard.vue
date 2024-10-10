<template>
    <div class="dashboard">
      <h1>Task Dashboard</h1>
  
      <div class="dashboard-container">
        <div class="form-section">
          <h2>Add a New Task</h2>
          <TaskForm v-if="isAuthenticated" @taskAdded="fetchTasks" :userId="userId" />
        </div>
  
        <div class="tasks-section">
          <h2>Your Tasks</h2>
          <ul class="tasks-list">
            <li v-for="task in tasks" :key="task._id" class="task-item">
              <div class="task-info">
                <h3>{{ task.title }}</h3>
                <p>{{ task.description }}</p>
                <small>Due: {{ new Date(task.dueDate).toLocaleDateString() }}</small>
              </div>
              <button @click="deleteTask(task._id)" class="delete-btn">Delete</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import TaskForm from '@/components/TaskForm.vue';
  import { mapState } from 'vuex';
  import axios from 'axios';
  
  export default {
    components: {
      TaskForm,
    },
    data() {
      return {
        tasks: [],
        userId: null,
      };
    },
    computed: {
      ...mapState(['isAuthenticated']), // Mapea el estado de autenticación desde Vuex
    },
    created() {
      this.setUserId();
      this.fetchTasks();
    },
    methods: {
      async fetchTasks() {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:3000/api/tasks', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.tasks = response.data;
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      },
      setUserId() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user._id) {
          this.userId = user._id; // Asegúrate de que se establece correctamente
      } else {
          console.error('No userId found in localStorage');
      }
  },
  
  
      async deleteTask(taskId) {
        try {
          const token = localStorage.getItem('token');
          await axios.delete(`http://localhost:3000/api/tasks/${taskId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.fetchTasks(); // Actualizar las tareas después de la eliminación
        } catch (error) {
          console.error('Error deleting task:', error);
        }
      },
    },
  };
  </script>
  
  
  <style scoped>
  .dashboard-container {
    background-color: #1abc9c;
    display: flex;
    flex-direction: column; /* Cambiado a columna para pantallas pequeñas */
    padding: 20px;
  }
  
  .form-section,
  .tasks-section {
    width: auto; /* Cambiado a 100% por defecto */
    margin-bottom: 20px; /* Espaciado entre secciones */
  }
  
  @media (min-width: 768px) {
    .dashboard-container {
      flex-direction: row; /* Cambiado a fila en pantallas más grandes */
    }
  
    .form-section,
    .tasks-section {
      width: 45%; /* Ancho de 45% para pantallas más grandes */
    }
  }
  
  h1,
  h2 {
    text-align: center;
    color: #34495e;
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .form-section {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgb(0, 0, 0.1);
  }
  
  .task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 1px 5px rgb(0, 0, 0.1);
    margin-bottom: 10px; /* Espacio entre las tareas */
  }
  
  .task-info h3 {
    margin: 0;
    color: #333;
  }
  
  .delete-btn {
    background-color: #dd321f;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 8px 12px;
    cursor: pointer;
  }
  
  .delete-btn:hover {
    background-color: #c0392b;
  }
  </style>
  