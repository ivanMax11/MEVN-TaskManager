<template>
    <div>
      <h2>Your Tasks</h2>
      <task-form @task-added="fetchTasks" />
      <ul>
        <li v-for="task in tasks" :key="task._id">
          {{ task.title }}
          <button @click="deleteTask(task._id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import TaskForm from './TaskForm.vue';
  
  export default {
    components: { TaskForm },
    data() {
      return {
        tasks: [],
      };
    },
    created() {
      this.fetchTasks();
    },
    methods: {
      async fetchTasks() {
        try {
          const response = await axios.get('http://localhost:YOUR_PORT/api/tasks', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          this.tasks = response.data;
        } catch (error) {
          console.error(error);
        }
      },
      async deleteTask(taskId) {
        try {
          await axios.delete(`http://localhost:YOUR_PORT/api/tasks/${taskId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          this.fetchTasks();
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  