<template>
    <v-container style="margin-top: 20px" align="center" v-if="employee">
      <v-card style="width: 65%;">
        <v-row align="center" style="margin-bottom: 10px;">
          <v-col cols="12">
            <v-avatar style="background-color:darkgray;" size="150">
              <v-img :src="employee.profileEm" alt="Profile Picture"></v-img>
            </v-avatar>
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center" cols="12">
            <v-card-title class="ma-0">Full Name: {{ employee.name }}</v-card-title>
            <v-card-subtitle>Position: {{ employee.position }}</v-card-subtitle>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="4">
            <v-sheet class="ma-2 pa-2"><v-card-title>Gender: {{ employee.gender }}</v-card-title></v-sheet>
          </v-col>
          <v-col cols="4">
            <v-sheet class="ma-2 pa-2"><v-card-title>Age: {{ employee.age }}</v-card-title></v-sheet>
          </v-col>
          <v-col cols="4">
            <v-sheet class="ma-2 pa-2"><v-card-title>Salary: {{ employee.salary }}</v-card-title></v-sheet>
          </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-btn @click="backHomePage" style="margin-right: 20px" type="button" color="red">Back</v-btn>
            </v-col>
        </v-row>
        <v-row><v-col></v-col></v-row>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute,useRouter } from 'vue-router';
  import { useEmployeeStore } from '../stores/employee';
  
  const router = useRouter();
  const route = useRoute();
  const employeeId = ref(route.params.id);
  const employeeStore = useEmployeeStore();
  const employee = ref(null);
  
  const backHomePage = () =>{
    router.push({ path: `/` });
  }
  onMounted(() => {
    employee.value = employeeStore.employees.find(emp => emp.id === parseInt(employeeId.value));
  });
  </script>
  
  <style>

  </style>
  