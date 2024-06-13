<template>
  <v-app class="app-root">
    <v-app-bar app color="primary" dark>
      <v-app-bar-title>Vanti Lead Dev Assessment</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-card>
          <bookings-table/>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import BookingsTable from '@/components/BookingsTable.vue';
</script>
