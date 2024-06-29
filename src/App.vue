<template>
  <v-responsive class="border rounded" max-height="100%">
    <v-app :theme="theme">
      <v-app-bar class="px-3">
        <v-app-bar-title>Employees Management</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-avatar><v-img src="./assets/profile.png"></v-img></v-avatar>
        </v-btn>
      </v-app-bar>

      <v-main>
        <v-container>
          <v-btn color="primary" @click="openAddModal">
            <v-icon left>mdi-plus</v-icon>Add
          </v-btn>

          <v-data-table
            style="padding-top: 10px;"
            :headers="headers"
            :items="displayedEmployees"
            item-key="id"
            :items-per-page="itemsPerPage"
            :footer-props="{
              itemsPerPageOptions: [5, 10, 20, 50],
              showCurrentPage: true,
              showFirstLastPage: true,
              showItemsPerPage: true
            }"
            :pagination="{ enabled: true, totalItems: employeeStore.employees.length, itemsPerPage: itemsPerPage, currentPage: currentPage }"
          >
            <template v-slot:item.index="{ index }">
              <td>{{ index + 1 + itemsPerPage * (currentPage - 1) }}</td>
            </template>
            <thead style="background-color:grey; color: aliceblue;">
              <tr>
                <th class="text-left">#</th>
                <th class="text-left">Name</th>
                <th class="text-left">Gender</th>
                <th class="text-left">Age</th>
                <th class="text-left">Position</th>
                <th class="text-left">Salary</th>
                <th class="text-left">Tools</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(em, index) in displayedEmployees" :key="em.id">
                <td>{{ index + 1 + itemsPerPage * (currentPage - 1) }}</td>
                <td>{{ em.name }}</td>
                <td>{{ em.gender }}</td>
                <td>{{ em.age }}</td>
                <td>{{ em.position }}</td>
                <td>{{ em.salary }}</td>
                <td class="text-left">
                  <v-icon style="color: black; margin-right: 10px;" @click="showUserModal(em.id)">mdi-eye</v-icon>
                  <v-icon style="color: gold; margin-right: 10px;" @click="openEditModal(em.id)">mdi-pencil</v-icon>
                  <v-icon style="color: red;" @click="deleteEmployee(em.id)">mdi-delete</v-icon>
                </td>
              </tr>
            </tbody>
          </v-data-table>

          <Modal :show="showModal" :title="modalTitle" @close="showModal = false" @save="saveEmployee" :saveButtonText="saveButtonText">
            <v-text-field v-model="currentEmployee.name" label="Name"></v-text-field>
            <v-select v-model="currentEmployee.gender" :items="genderOptions" label="Gender"></v-select>
            <v-text-field v-model="currentEmployee.age" label="Age" type="number" @input="validateNumber_age"></v-text-field>
            <v-select v-model="currentEmployee.position" :items="positionOptions" label="Position"></v-select>
            <v-text-field v-model="currentEmployee.salary" label="Salary" type="number" @input="validateNumber_salary"></v-text-field>
          </Modal>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import Modal from './components/modal';
import { useEmployeeStore } from './stores/employee';

const genderOptions = ref(['Male', 'Female', 'Other']);
const positionOptions = ref(['UX/UI', 'IT Support', 'Developer', 'Front-end', 'Back-end', 'Mobile app', 'Tester']);
const employeeStore = useEmployeeStore();
const showModal = ref(false);
const modalTitle = ref('');
const saveButtonText = ref('');
const itemsPerPage = ref(10);
const currentPage = ref(1);
const currentEmployee = ref({
  id: null,
  name: '',
  gender: '',
  age: '',
  position: '',
  salary: ''
});

const openAddModal = () => {
  currentEmployee.value = { id: null, name: '', gender: '', age: '', position: '', salary: '' };
  modalTitle.value = 'Add Employee';
  saveButtonText.value = 'Add';
  showModal.value = true;
};

const openEditModal = (employeeId) => {
  const employee = employeeStore.employees.find(e => e.id === employeeId);
  if (employee) {
    currentEmployee.value = { ...employee };
    modalTitle.value = 'Edit Employee';
    saveButtonText.value = 'Update';
    showModal.value = true;
  }
};

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

const deleteEmployee = (employeeId) => {
  employeeStore.deleteEmployee(employeeId);
};

const validateNumber_age = (event) => {
  const value = event.target.value;
  event.target.value = value.replace(/[^0-9]/g, '');
  currentEmployee.value.age = event.target.value;
};

const validateNumber_salary = (event) => {
  const value = event.target.value;
  event.target.value = value.replace(/[^0-9]/g, '');
  currentEmployee.value.salary = event.target.value;
};

const displayedEmployees = ref([]);

// Watch for changes in itemsPerPage and currentPage to update displayedEmployees
watchEffect(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  displayedEmployees.value = employeeStore.employees.slice(startIndex, startIndex + itemsPerPage.value);
});

</script>

<style>
/* Your custom styles */
</style>
