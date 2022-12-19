<template>
  <header>
    <h1>{{ title }}</h1>
    <ButtonComponent
      @btn-click="$emit('toggle-add-task')"
      :text="showAddTask ? 'Close' : 'Add Task'"
      :color="showAddTask ? 'red' : 'green'"
    />
    <!-- <ButtonComponent text="Update Task" color="blue" />
    <ButtonComponent text="Delete Task" color="red" /> -->
  </header>
</template>

<script>
import ButtonComponent from "./Button.vue";

export default {
  name: "HeaderItem",
  props: {
    title: {
      type: String,
      default: "Hello World",
    },
    showAddTask: Boolean,
  },
  components: {
    ButtonComponent,
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>