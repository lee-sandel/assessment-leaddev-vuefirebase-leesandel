<template>
  <v-card>
    <v-data-table :headers="headers" :items="rooms">
      <template #top>
        <v-toolbar flat dense>
          <v-spacer/>
          <room-form/>
        </v-toolbar>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: 'RoomsTable',
  computed: {
    ...mapState('rooms', ['rooms']),
    headers() {
      return [
        {text: 'Room', value: 'title'},
      ];
    }
  },
};
</script>