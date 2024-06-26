<template>
  <v-dialog max-width="800" v-model="open">
    <template #activator="{on}">
      <v-btn rounded color="primary" v-on="on"><v-icon>mdi-plus</v-icon></v-btn>
    </template>
    <v-form @submit.prevent="newBooking">
      <v-card>
        <v-card-title>New Booking</v-card-title>
        <v-card-text>
          <v-text-field v-model="booking.title" label="Subject"/>
          <div class="d-flex">
            <v-text-field type="number" min="1" v-model="booking.guests" label="Number of Guests" class="pr-4"/>
            <v-combobox
              v-model="booking.room.title"
              @change="titleChange"
              @keyup="titleChange"
              @input.native="booking.room.title=$event.srcElement.value"
              label="Room"
              class="pr-4"
              :items="roomNames"
            />
          </div>
          <v-text-field v-model="roomRefPath" label="Reference" prefix="rooms/"/>
          <h5>From</h5>
          <date-time-picker v-model="booking.fromTime"/>
          <h5>To</h5>
          <date-time-picker v-model="booking.toTime"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn text @click="open = false">Cancel</v-btn>
          <v-btn color="primary" :disabled="!canSubmit" type="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import {send} from '@/api';
import {isValidBooking, newBooking} from '@/components/bookings';
import DateTimePicker from '@/components/DateTimePicker.vue';
import {mapState} from 'vuex';

export default {
  name: 'BookingForm',
  components: {DateTimePicker},
  data() {
    return {
      booking: newBooking(),
      open: false,
      room: null
    };
  },
  computed: {
    ...mapState('rooms', ['rooms']),
    roomNames() {
      return this.rooms.filter(a => a.capacity >= this.booking.guests).map(a => a.title);
    },
    canSubmit() {
      return isValidBooking(this.booking, this.selectedRoom);
    },
    roomRefPath: {
      get() {
        return this.booking.room.ref.path.replace('rooms/', '');
      },
      set(v) {
        if (!v.startsWith('rooms/')) {
          v = 'rooms/' + v;
        }
        this.booking.room.ref.path = v;
      }
    },
    selectedRoom() {
      return this.rooms.filter(a => a.title === this.booking.room.title)[0];
    }
  },
  watch: {
    open() {
      if (this.open) {
        this.booking = newBooking();
      }
    }
  },
  methods: {
    titleChange() {
      this.roomRefPath = this.booking.room.title ? this.booking.room.title.toLowerCase().replaceAll(' ', '-') : '';
    },
    newBooking() {
      if (!isValidBooking(this.booking, this.selectedRoom)) {
        return;
      }
      send({
        type: 'set-document',
        ref: {path: 'bookings'},
        document: this.booking
      });
      this.open = false;
    }
  }
};
</script>

<style scoped>

</style>
