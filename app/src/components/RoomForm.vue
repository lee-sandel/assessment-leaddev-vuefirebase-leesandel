<template>
  <v-dialog max-width="800" v-model="open" @click:outside="closeDialog">
    <template #activator="{on}">
      <v-btn rounded color="primary" v-on="on"><v-icon>mdi-plus</v-icon></v-btn>
    </template>
    <v-form @submit.prevent="newRoom">
      <v-card>
        <v-card-title v-if="edit">Edit Room</v-card-title>
        <v-card-title v-else>Create Room</v-card-title>
        <v-card-text>
          <div class="d-flex">
            <v-text-field v-model="room.title" label="Room Name" class="pr-4" @input="titleChange"/>
            <v-text-field type="number" v-model="room.capacity" label="Room Capacity"/>
          </div>
          <v-text-field v-model="roomRefPath" label="Reference" prefix="rooms/"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn text @click="closeDialog">Cancel</v-btn>
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
  props: {
    externalOpen: Boolean
  },
  data() {
    return {
      room: newRoom(),
      roomRefPath: '',
      open: false,
      edit: false,
      refId: null,
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
        if(this.room.ref) {
          this.edit = true;
          this.refId = this.room.ref;
        }
      }
    },
    externalOpen() {
      this.open = this.externalOpen;
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
      if(this.edit) {
        send({
          type: 'edit-document',
          refId: this.refId,
          ref: {path: `rooms/${this.roomRefPath}`},
          document: this.room
        });
      } else {
        send({
          type: 'set-document',
          ref: {path: `rooms/${this.roomRefPath}`},
          document: this.room
        });
      }
      this.closeDialog();
    },
    closeDialog() {
      this.open = false;
      this.$emit('close');
    }
  }
};
</script>