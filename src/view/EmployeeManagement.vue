<template>
  <v-responsive class="border rounded" max-height="100%">
    <v-app>
      <v-main>
        <v-container>
          <!-- Add Button -->
          <v-btn style="margin-bottom: 10px" color="primary" @click="navigateToAdd">
            <v-icon left>mdi-plus</v-icon>Add
          </v-btn>
          
          <!-- Data Table -->
          <v-data-table :headers="headers" :items="employeeStore.employees" item-key="id">
            <!-- Table headers -->
            <template v-slot:[`headers`]>
              <tr>
                <th style="background-color: darkgray" v-for="header in headers" :key="header.value" class="text-left">
                  {{ header.text }}
                </th>
              </tr>
            </template>

            <!-- Table rows -->
            <template v-slot:[`item.index`]="{ index }">
              <td>{{ index + 1 }}</td>
            </template>
            <template v-slot:[`item.profileEm`]="{ item }">
              <td>
                <v-img :src="item.profileEm" width="50" height="50" contain></v-img>
              </td>
            </template>
            <template v-slot:[`item.name`]="{ item }">
              <td>{{ item.name }}</td>
            </template>
            <template v-slot:[`item.gender`]="{ item }">
              <td>{{ item.gender }}</td>
            </template>
            <template v-slot:[`item.age`]="{ item }">
              <td>{{ item.age }}</td>
            </template>
            <template v-slot:[`item.position`]="{ item }">
              <td>{{ item.position }}</td>
            </template>
            <template v-slot:[`item.salary`]="{ item }">
              <td>{{ item.salary }}</td>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <td>
                <!-- Tools Icons -->
                <v-icon style="color: black; margin-right: 10px;" @click="showUserModal(item.id)">mdi-eye</v-icon>
                <v-icon style="color: gold; margin-right: 10px;" @click="navigateToEdit(item.id)">mdi-pencil</v-icon>
                <v-icon style="color: red;" @click="deleteEmployee(item.id)">mdi-delete</v-icon>
              </td>
            </template>
          </v-data-table>
          
          <!-- Add Modal Component -->
          <Modal :show="showModal" :title="modalTitle" @close="showModal = false" @save="saveEmployee" :saveButtonText="saveButtonText">
            <v-text-field v-model="currentEmployee.name" label="Name"></v-text-field>
            <v-select v-model="currentEmployee.gender" :items="genderOptions" label="Gender"></v-select>
            <v-text-field v-model="currentEmployee.age" label="Age" type="number" @input="validateNumber_age"></v-text-field>
            <v-select v-model="currentEmployee.position" :items="positionOptions" label="Position"></v-select>
            <v-text-field v-model="currentEmployee.salary" label="Salary" type="number" @input="validateNumber_salary"></v-text-field>
            <v-file-input v-model="currentEmployee.profileEm" label="Profile Picture" accept="image/png" @change="onFileChange"></v-file-input>
          </Modal>
          
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Modal from '../components/modal'; // Assuming the path to your Modal component
import { useEmployeeStore } from '../stores/employee'; // Assuming the path to your employee store

const genderOptions = ref(['Male', 'Female', 'Other']);
const positionOptions = ref(['UX/UI', 'IT Support', 'Developer', 'Front-end', 'Back-end', 'Mobile app', 'Tester']);
const employeeStore = useEmployeeStore(); // Assuming you have a Pinia store for employees

// State for modal
const showModal = ref(false);
const modalTitle = ref('');
const saveButtonText = ref('');

// State for current employee being edited or added
const currentEmployee = ref({
  id: null,
  name: '',
  gender: '',
  age: '',
  position: '',
  salary: '',
  profileEm: ''
});

const router = useRouter();

// Open modal to add new employee
const navigateToAdd = () => {
  currentEmployee.value = { id: null, name: '', gender: '', age: '', position: '', salary: '', profileEm: '' };
  modalTitle.value = 'Add Employee';
  saveButtonText.value = 'Add';
  showModal.value = true;
};

// Navigate to edit employee by ID
const navigateToEdit = (employeeId) => {
  router.push({ path: `/edit/${employeeId}` });
};

// Show detailed employee modal by ID
const showUserModal = (employeeId) => {
  router.push({ path: `/EmployeeInfo/${employeeId}` });
};

// Save employee data (add or edit)
const saveEmployee = () => {
  if (currentEmployee.value.id === null) {
    currentEmployee.value.id = employeeStore.employees.length ? employeeStore.employees[employeeStore.employees.length - 1].id + 1 : 1;
    employeeStore.addEmployee(currentEmployee.value);
  } else {
    const index = employeeStore.employees.findIndex(e => e.id === currentEmployee.value.id);
    if (index !== -1) {
      employeeStore.employees[index] = { ...currentEmployee.value };
    }
  }
  showModal.value = false;
};

// Delete employee by ID
const deleteEmployee = (employeeId) => {
  employeeStore.deleteEmployee(employeeId);
};

// Validate numeric input for age
const validateNumber_age = (event) => {
  event.target.value = event.target.value.replace(/[^0-9]/g, '');
  currentEmployee.value.age = event.target.value;
};

// Validate numeric input for salary
const validateNumber_salary = (event) => {
  event.target.value = event.target.value.replace(/[^0-9]/g, '');
  currentEmployee.value.salary = event.target.value;
};

// Handle file upload change
const onFileChange = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    currentEmployee.value.profileEm = e.target.result;
  };
  reader.readAsDataURL(file);
};

// Headers for data table
const headers = [
  { text: '#', value: 'index' },
  { text: 'Profile', value: 'profileEm' },
  { text: 'Name', value: 'name' },
  { text: 'Gender', value: 'gender' },
  { text: 'Age', value: 'age' },
  { text: 'Position', value: 'position' },
  { text: 'Salary', value: 'salary' },
  { text: 'Tools', value: 'actions' }
].map((h, i) => ({ ...h, align: i === 0 ? 'start' : 'center' }));

</script>

<style>
/* Add any styles you need here */
</style>
