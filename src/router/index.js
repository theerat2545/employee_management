// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
// import AboutPage from '../views/AboutView.vue'; 

const routes = [
  // {
  //   path: '/about',
  //   name: 'AboutPage', 
  //   component: AboutPage 
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
