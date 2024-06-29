<template>
  <v-responsive class="border rounded" max-height="100%">
    <v-app :theme="theme">
      <v-app-bar class="px-3">
        <v-app-bar-title>Employees Management</v-app-bar-title>
        <v-spacer></v-spacer>

        <v-btn :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" slim @click="onClick"></v-btn>
        <v-btn icon><v-avatar><v-img src="./assets/profile.png"></v-img></v-avatar></v-btn>
      </v-app-bar>

      <v-main>
        <v-container>
            
        </v-container>
      </v-main>
      
    </v-app>
  </v-responsive>
</template>

<script setup>
  import { ref } from 'vue'

  const theme = ref('light')

  function onClick () {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }
</script>