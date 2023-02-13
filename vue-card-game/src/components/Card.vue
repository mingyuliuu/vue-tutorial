<template>
  <div class="card" @click="selectCard">
    <div v-if="visible" class="card-face is-front">
      <img class="card-image" :src="`/images/${value}.png`" :alt="value" />
    </div>
    <div v-else class="card-face is-back"></div>
  </div>
</template>

<script>
export default {
  name: "CardComponent",
  props: {
    matched: {
      type: Boolean,
      default: false,
    },
    position: {
      type: Number,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const selectCard = () => {
      context.emit("select-card", {
        position: props.position,
        faceValue: props.value,
      });
    };

    return {
      selectCard,
    };
  },
};
</script>

<style scoped>
.card {
  position: relative;
}

.card-face {
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-face.is-front {
  color: white;
}

.card-face.is-back {
  background-color: thistle;
  background-image: url("../../public/images/card-empty.png");
  background-repeat: no-repeat;
  background-size: 60% 80%;
  background-position: center;
  color: white;
}

.card-image {
  height: 100%;
  width: 100%;
  border-radius: 10px;
}
</style>