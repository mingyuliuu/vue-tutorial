<template>
  <div>
    <h1>Peek-a-Vue</h1>
    <section class="description">
      <p>Welcome to Peek-a-Vue -- a card matching game powered by Vue.js!</p>
    </section>
    <transition-group tag="section" class="game-board" name="shuffle-card">
      <CardComponent
        v-for="card in cardList"
        :key="`${card.value}-${card.variant}`"
        :matched="card.matched"
        :value="card.value"
        :visible="card.visible"
        :position="card.position"
        @select-card="flipCard"
      />
    </transition-group>
    <h3 class="status">{{ status }}</h3>
    <button v-if="newPlayer" @click="startGame" class="button">
      <img src="../public/images/play.png" alt="Start" /> Start Game
    </button>
    <button v-else @click="restartGame" class="button">
      <img src="../public/images/restart.png" alt="Restart" /> Restart Game
    </button>
  </div>
</template>

<script>
import _ from "lodash";
import { computed, ref, watch } from "vue";
import CardComponent from "./components/Card.vue";
import { launchConfetti } from "./utilities/confetti";

export default {
  name: "App",
  components: {
    CardComponent,
  },
  setup() {
    const cardList = ref([]);
    const userSelection = ref([]);
    const newPlayer = ref(true);

    const startGame = () => {
      newPlayer.value = false;

      restartGame();
    };

    const status = computed(() => {
      if (remainingPairs.value === 0) {
        return "You win!";
      } else {
        return `Remaining pairs: ${remainingPairs.value}`;
      }
    });

    const remainingPairs = computed(() => {
      const remainingCards = cardList.value.filter(
        (card) => card.matched === false
      ).length;

      return remainingCards / 2;
    });

    const restartGame = () => {
      cardList.value = _.shuffle(cardList.value);

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
        variant: 1,
        visible: false,
        position: null,
        matched: false,
      });

      cardList.value.push({
        value: item,
        variant: 2,
        visible: true,
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

    watch(remainingPairs, (currentValue) => {
      if (currentValue === 0) {
        launchConfetti();
      }
    });

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
      startGame,
      newPlayer,
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
  padding-top: 4vh;
  margin: 0;
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

.description {
  font-family: "Titillium Web", sans-serif;
}

.description p {
  margin-bottom: 20px;
}

.button {
  background-color: cadetblue;
  color: white;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-family: "Titillium Web", sans-serif;
  font-weight: bold;
  border: none;
  border-radius: 10px;
}

.button img {
  padding-right: 5px;
  height: 30px;
}

.status {
  font-family: "Titillium Web", sans-serif;
}

.game-board {
  display: grid;
  grid-template-columns: repeat(4, 130px);
  grid-template-rows: repeat(4, 95px);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  justify-content: center;
}

.shuffle-card-move {
  transition: transform 0.8s ease-in;
}
</style>
