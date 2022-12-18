<template>
  <button class="btn" :style="{ background: color }">{{ text }}</button>
</template>

<script>
export default {
  name: "ButtonComponent",
  props: {
    text: String,
    color: String,
  },
};
</script>
