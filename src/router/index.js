import { createRouter, createWebHistory } from 'vue-router';
import EmployeeManagement from '../view/EmployeeManagement.vue';
import EditEmployee from '../view/edit_update.vue';
import EmployeeInfo from '../view/showEmploee_Info.vue';

const routes = [
  {
    path: '/',
    name: 'EmployeeManagement',
    component: EmployeeManagement,
  },
  {
    path: '/edit/:id',
    name: 'EditEmployee',
    component: EditEmployee,
    props: true,
  },
  {
    path: '/EmployeeInfo/:id',
    name: 'ShowEmployeeInfomation',
    component: EmployeeInfo,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
