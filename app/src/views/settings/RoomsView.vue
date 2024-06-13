<template>
  <sidebar-layout>
    <template v-slot:left-content>
      <v-card>
        <settings-menu/>
      </v-card>
    </template>
    <template v-slot:right-content>
      <rooms-table/>
    </template>
  </sidebar-layout>
</template>
  
<script setup>
  import SidebarLayout from '@/layouts/SidebarLayout.vue';
  import SettingsMenu from '@/components/menus/SettingsMenu.vue';
  import RoomsTable from '@/components/RoomsTable.vue';
</script>
  