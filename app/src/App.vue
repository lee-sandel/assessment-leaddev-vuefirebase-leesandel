<template>
  <v-app class="app-root">
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Vanti Lead Dev Assessment - Lee Sandel</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="mr-2" text to="/">Room Bookings</v-btn>
      <v-btn text to="/settings/rooms">Settings</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import BookingsTable from '@/components/BookingsTable.vue';
</script>
