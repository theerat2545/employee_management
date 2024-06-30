<template>
  <v-container>
    <v-form @submit.prevent="saveEmployee">
      <v-text-field v-model="employee.name" label="Name"></v-text-field>
      <v-select v-model="employee.gender" :items="genderOptions" label="Gender"></v-select>
      <v-text-field v-model="employee.age" label="Age" type="number" @input="validateNumber_age"></v-text-field>
      <v-select v-model="employee.position" :items="positionOptions" label="Position"></v-select>
      <v-text-field v-model="employee.salary" label="Salary" type="number" @input="validateNumber_salary"></v-text-field>
      <v-file-input v-model="employee.profileEm" label="Profile Picture" accept="png/*" @change="onFileChange"></v-file-input>
      <v-btn @click="backHomePage" style="margin-right: 20px" type="button" color="red">Back</v-btn>
      <v-btn type="submit" color="primary">{{ employee.id ? 'Update' : 'Add' }}</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEmployeeStore } from '../stores/employee';

const route = useRoute();
const router = useRouter();
const employeeStore = useEmployeeStore();

const genderOptions = ref(['Male', 'Female', 'Other']);
const positionOptions = ref(['UX/UI', 'IT Support', 'Developer', 'Front-end', 'Back-end', 'Mobile app', 'Tester']);
const employee = ref({
  id: null,
  name: '',
  gender: '',
  age: '',
  position: '',
  salary: '',
  profileEm: ''
});

const onFileChange = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    employee.value.profileEm = e.target.result;
  };
  reader.readAsDataURL(file);
};

const validateNumber_age = (event) => {
  const value = event.target.value;
  event.target.value = value.replace(/[^0-9]/g, '');
  employee.value.age = event.target.value;
};

const validateNumber_salary = (event) => {
  const value = event.target.value;
  event.target.value = value.replace(/[^0-9]/g, '');
  employee.value.salary = event.target.value;
};

const backHomePage = () => {
  router.push('/');
}

const saveEmployee = () => {
  if (employee.value.id === null) {
    // Adding a new employee
    employee.value.id = employeeStore.employees.length ? employeeStore.employees[employeeStore.employees.length - 1].id + 1 : 1;
    employeeStore.addEmployee(employee.value);
  } else {
    // Updating an existing employee
    const index = employeeStore.employees.findIndex(e => e.id === employee.value.id);
    if (index !== -1) {
      employeeStore.employees[index] = { ...employee.value };
    }
  }
  router.push('/');
};

onMounted(() => {
  const employeeId = route.params.id;
  if (employeeId) {
    // Fetch existing employee details if editing
    const existingEmployee = employeeStore.employees.find(e => e.id === parseInt(employeeId));
    if (existingEmployee) {
      employee.value = { ...existingEmployee };
    }
  }
});
</script>

<style scoped>
/* Your scoped styles here */
</style>
