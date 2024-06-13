<template>
  <v-card>
    <v-data-table id="rooms-table" :headers="headers" :items="rooms" @click:row="editRoom">
      <template #top>
        <v-toolbar flat dense>
          <v-spacer/>
          <room-form :externalOpen="open" @close="closeEdit"/>
        </v-toolbar>
      </template>
      <template #item.capacity="{value}">
        <span v-if="value">{{ value }} people</span>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import {mapState, mapMutations} from 'vuex';

export default {
  name: 'RoomsTable',
  data: () => ({
    open: false
  }),
  computed: {
    ...mapState('rooms', ['rooms']),
    headers() {
      return [
        {text: 'Room', value: 'title'},
        {text: 'Capacity', value: 'capacity'},
      ];
    }
  },
  methods: {
    ...mapMutations('rooms', ['setActiveRoomEdit']),
    editRoom(room) {
      this.setActiveRoomEdit(room);
      this.open = true;
    },
    closeEdit() {
      this.setActiveRoomEdit(null);
      this.open = false;
    }
  }
};
</script>

<style>
#rooms-table tr:hover {
  cursor: pointer;
}
</style>