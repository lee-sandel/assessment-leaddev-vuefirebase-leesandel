<template>
  <v-data-table :headers="headers" :items="bookings">
    <template #top>
      <v-toolbar flat dense>
        <v-spacer/>
        <booking-form/>
      </v-toolbar>
    </template>
    <template #item.fromTime="{value}">
      {{ formatDate(value) }}
    </template>
    <template #item.toTime="{value}">
      {{ formatDate(value) }}
    </template>
  </v-data-table>
</template>

<script>
import {mapState} from 'vuex';
import BookingForm from '@/components/BookingForm.vue';

export default {
  name: 'BookingsTable',
  components: {BookingForm},
  computed: {
    ...mapState('bookings', ['bookings']),
    headers() {
      return [
        {text: 'Room', value: 'room.title'},
        {text: 'Subject', value: 'title'},
        {text: 'Guests', value: 'guests'},
        {text: 'From', value: 'fromTime'},
        {text: 'To', value: 'toTime'}
      ];
    }
  },
  methods: {
    formatDate(str) {
      const d = new Date(str);
      return d.toLocaleTimeString();
    }
  }
};
</script>

<style scoped>

</style>
