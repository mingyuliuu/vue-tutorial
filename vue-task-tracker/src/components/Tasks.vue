<template>
  <div>
    <div v-for="task in tasks" :key="task.id">
      <TaskItem @delete-task="$emit('delete-task', task.id)" :task="task" />
    </div>
  </div>
</template>

<script>
import TaskItem from "./Task.vue";

export default {
  name: "TasksCollection",
  props: {
    tasks: Array,
  },
  components: {
    TaskItem,
  },
  emits: ['delete-task']
};
</script>