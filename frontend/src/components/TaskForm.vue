<template>
    <form class="task-form" @submit.prevent="submitTask">
      <div class="form-group">
        <label for="title">Task Title:</label>
        <input type="text" id="title" v-model="task.title" required placeholder="Enter task title" />
      </div>
  
      <div class="form-group">
        <label for="description">Task Description:</label>
        <textarea id="description" v-model="task.description" required placeholder="Enter task description"></textarea>
      </div>
  
      <div class="form-group">
        <label for="dueDate">Due Date:</label>
        <input type="date" id="dueDate" v-model="task.dueDate" required />
      </div>
  
      <button type="submit" class="add-task-btn">Add Task</button>
    </form>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      userId: {
        type: String,
        required: true, // Pasamos el userId como prop, igual que en tu ejemplo
        default: '',
      },
    },
    data() {
      return {
        task: {
          title: '',
          description: '',
          dueDate: '',
        },
      };
    },
    methods: {
      async submitTask() {
        try {
          const token = localStorage.getItem('token'); // Obtener el token de autenticación
          const newTask = {
            ...this.task,
            userId: this.userId, // Asegurarse de que el userId esté en la tarea
          };
          // Hacemos la petición HTTP con axios
          await axios.post('http://localhost:3000/api/tasks', newTask, {
            headers: {
              Authorization: `Bearer ${token}`, // Adjuntar el token en los headers
            },
          });
          this.$emit('taskAdded'); // Emitimos evento para notificar que la tarea se agregó
          this.task = { title: '', description: '', dueDate: '' }; // Limpiamos el formulario
        } catch (error) {
          console.error('Error al agregar la tarea:', error.response?.data || error.message);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Aquí añadimos los estilos para el formulario */
  .task-form {
    background-color: #f0f4f8;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 0 auto;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #333;
  }
  
  input, textarea {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    font-size: 16px;
  }
  
  textarea {
    resize: vertical;
  }
  
  .add-task-btn {
    background-color: #34495e;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
  }
  
  .add-task-btn:hover {
    background-color: #1abc9c;
  }
  
  input:focus, textarea:focus {
    outline: none;
    border-color: #007BFF;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
  </style>
  