<template>
  <v-container d-flex>
    <v-col class="flex-grow-0 flex-shrink-1">
      <slot name="left-content"/>
    </v-col>
    <v-col class="flex-grow-1 flex-shrink-0">
      <slot name="right-content"/>
    </v-col>
  </v-container>
</template>