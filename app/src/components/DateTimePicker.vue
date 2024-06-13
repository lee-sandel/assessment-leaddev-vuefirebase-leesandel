<template>
  <div class="d-flex">
    <v-menu
        ref="date"
        v-model="datePicker"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
            v-model="dateStr"
            label="Date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
          v-model="dateStr"
          no-title
          scrollable
      >
        <v-spacer></v-spacer>
        <v-btn
            text
            color="primary"
            @click="datePicker = false"
        >
          Cancel
        </v-btn>
        <v-btn
            text
            color="primary"
        >
          OK
        </v-btn>
      </v-date-picker>
    </v-menu>
    <v-menu
        ref="time"
        v-model="timePicker"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
            v-model="timeStr"
            label="Time"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
        ></v-text-field>
      </template>
      <v-time-picker
          v-if="timePicker"
          v-model="timeStr"
          format="24hr"
          full-width
      ></v-time-picker>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'DateTimePicker',
  props: {
    value: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      datePicker: false,
      timePicker: false,
      date: this.value
    };
  },
  computed: {
    dateStr: {
      get() {
        return this.date.toISOString().substring(0, 'YYYY-MM-DD'.length);
      },
      set(v) {
        this.date = new Date(v + 'T' + this.timeStr);
        this.$emit('input', this.date);
      }
    },
    timeStr: {
      get() {
        return this.date.toISOString().substring('YYYY-MM-DDT'.length, 'YYYY-MM-DDTHH:mm'.length);
      },
      set(v) {
        this.date = new Date(this.dateStr + 'T' + v);
        this.$emit('input', this.date);
      }
    }
  },
  watch: {
    value() {
      this.date = this.value;
    }
  }
};
</script>

<style scoped>

</style>
