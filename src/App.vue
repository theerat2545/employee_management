<template>
  <v-responsive class="border rounded" max-height="100%">
    <v-app> 
   <v-app-bar class="px-3">
        <v-app-bar-title>Employees Management</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-avatar><v-img src="./assets/profile.png"></v-img></v-avatar>
        </v-btn>
      </v-app-bar>
      <v-main>
        <router-view />
      </v-main>
      </v-app>
      </v-responsive>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>

</style>
