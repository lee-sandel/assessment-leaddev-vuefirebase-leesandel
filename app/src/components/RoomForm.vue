<template>
  <v-dialog max-width="800" v-model="open">
    <template #activator="{on}">
      <v-btn rounded color="primary" v-on="on"><v-icon>mdi-plus</v-icon></v-btn>
    </template>
    <v-form @submit.prevent="newRoom">
      <v-card>
        <v-card-title>Create Room</v-card-title>
        <v-card-text>
          <div class="d-flex">
            <v-text-field v-model="room.title" label="Room Name" class="pr-4" @input="titleChange"/>
            <v-text-field v-model="roomRefPath" label="Reference" prefix="rooms/"/>
          </div>
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
import {isValidRoom, newRoom} from '@/components/rooms';

export default {
  name: 'RoomForm',
  data() {
    return {
      room: newRoom(),
      roomRefPath: '',
      open: false,
    };
  },
  computed: {
    canSubmit() {
      return isValidRoom(this.room);
    },
  },
  watch: {
    open() {
      if (this.open) {
        this.room = newRoom();
        this.roomRefPath = this.room.ref && this.room.ref.path ? this.room.ref.path.replace('rooms/', '') : '';
      }
    },
  },
  methods: {
    titleChange() {
      this.roomRefPath = this.room.title.toLowerCase().replaceAll(' ', '-');
    },
    newRoom() {
      if (!isValidRoom(this.room)) {
        return;
      }
      send({
        type: 'set-document',
        ref: {path: `rooms/${this.roomRefPath}`},
        document: this.room
      });
      this.open = false;
    },
  }
};
</script>