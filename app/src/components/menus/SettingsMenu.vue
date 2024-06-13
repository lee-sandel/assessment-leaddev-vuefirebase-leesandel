<template>
  <v-navigation-drawer>
    <v-list-item link title="Room Management" to="/settings/rooms">
      <v-icon class="mr-2">mdi-floor-plan</v-icon>
      Room Management
    </v-list-item>
    <!-- Additional Links - For display purposes only -->
    <v-list-item link title="User Management">
      <v-icon class="mr-2">mdi-account</v-icon>
      User Management
    </v-list-item>
    <v-list-item link title="Log out">
      <v-icon class="mr-2">mdi-account-off</v-icon>
      Log out
    </v-list-item>
    <!-- End additional Links -->
  </v-navigation-drawer>
</template>