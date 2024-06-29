<template>
  <v-dialog v-model="isVisible" max-width="600px">
    <v-card>
      <v-card-title class="d-flex">
        <span class="headline">{{ title }}</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeModal"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn style="background-color:indianred;" color="white" text @click="closeModal">Cancel</v-btn>
        <v-btn style="background-color: deepskyblue;" color="white" text @click="$emit('save')">{{ saveButtonText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "modal_1",
  props: {
    show: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: 'Modal Title'
    },
    saveButtonText: {
      type: String,
      default: 'Save'
    }
  },
  computed: {
    isVisible() {
      return this.show;
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>

</style>
