<template>
  <div>
    <h1>Peek-a-Vue</h1>
    <section class="game-board">
      <CardComponent
        v-for="(card, index) in cardList"
        :key="`card-${index}`"
        :matched="card.matched"
        :value="card.value"
        :visible="card.visible"
        :position="card.position"
        @select-card="flipCard"
      />
    </section>
    <h2>{{ status }}</h2>
    <button :on-click="restartGame" class="button">
      <img src="../public/images/restart.png" alt="Restart" /> Restart Game
    </button>
  </div>
</template>

<script>
import _ from "lodash";
import { computed, ref, watch } from "vue";
import CardComponent from "./components/Card.vue";

export default {
  name: "App",
  components: {
    CardComponent,
  },
  setup() {
    const cardList = ref([]);
    const userSelection = ref([]);

    const status = computed(() => {
      if (remainingPairs.value === 0) {
        return "Player wins!";
      } else {
        return `Remainging pairs: ${remainingPairs.value}`;
      }
    });

    const remainingPairs = computed(() => {
      const remainingCards = cardList.value.filter(
        (card) => card.matched === false
      ).length;

      return remainingCards / 2;
    });

    const shuffleCards = () => {
      cardList.value = _.shuffle(cardList.value);
    };

    const restartGame = () => {
      shuffleCards();

      cardList.value = cardList.value.map((card, index) => ({
        ...card,
        visible: false,
        position: index,
        matched: false,
      }));
    };

    const cardItems = [
      "card-1",
      "card-2",
      "card-3",
      "card-4",
      "card-5",
      "card-6",
      "card-7",
      "card-8",
    ];
    cardItems.forEach((item) => {
      cardList.value.push({
        value: item,
        visible: false,
        position: null,
        matched: false,
      });

      cardList.value.push({
        value: item,
        visible: false,
        position: null,
        matched: false,
      });
    });

    cardList.value = cardList.value.map((card, index) => {
      return {
        ...card,
        position: index,
      };
    });

    const flipCard = (payload) => {
      cardList.value[payload.position].visible = true;

      if (userSelection.value[0]) {
        if (
          userSelection.value[0].position === payload.position &&
          userSelection.value[0].faceValue === payload.faceValue
        )
          return;
        userSelection.value[1] = payload;
      } else {
        userSelection.value[0] = payload;
      }
    };

    watch(
      userSelection,
      (currentValue) => {
        if (currentValue.length === 2) {
          const cardOne = currentValue[0];
          const cardTwo = currentValue[1];

          if (cardOne.faceValue === cardTwo.faceValue) {
            cardList.value[cardOne.position].matched = true;
            cardList.value[cardTwo.position].matched = true;
          } else {
            setTimeout(() => {
              cardList.value[cardOne.position].visible = false;
              cardList.value[cardTwo.position].visible = false;
            }, 1200);
          }

          userSelection.value.length = 0;
        }
      },
      { deep: true }
    );

    return {
      cardList,
      flipCard,
      userSelection,
      status,
      restartGame,
    };
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

h1 {
  margin-top: 0;
  padding-top: 5vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url("../public/images/page-bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100vh;
}

.button {
  background-color: cadetblue;
  color: white;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-weight: bold;
  border-radius: 5px;
}

.button img {
  padding-right: 5px;
  height: 30px;
}

.game-board {
  display: grid;
  grid-template-columns: repeat(4, 130px);
  grid-template-rows: repeat(4, 100px);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  justify-content: center;
}
</style>
