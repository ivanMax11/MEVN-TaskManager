import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LoginForm from '../components/LoginForm.vue';
import RegisterForm from '../components/RegisterForm.vue';
import UserDashboard from '../views/UserDashboard.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginForm },
  { path: '/register', component: RegisterForm },
  { path: '/dashboard', component: UserDashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
