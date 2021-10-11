<template>
  <div class="home">
    <h1>Vue State Counter</h1>

    <p class="count">{{ count }}</p>
    <p>Count Tripled {{ countTripled }}</p>

    <div class="change-count">
      <i @click="increase" class="fal fa-plus"></i>
      <i @click="decrease" class="fal fa-minus"></i>
    </div>

    <div class="cod">
      <h1>Color of the day:</h1>
      <p>{{color}}</p>
      <input v-model="color" type="text" name="color">
    </div>
  </div>
</template>

<script>
  import {computed} from "vue";
  import store from "../store";


  export default {
    name: "Home",
    components: {},
    setup() {
      const count = computed(() => store.state.count);
      const countTripled = computed(() => store.getters.tripleCount());
      const color = computed({
        get() {
          return store.state.color;
        },
        set(value) {
          store.mutations.setColor(value);
        }
      })

      const increase = () => {
        store.mutations.increase();
      };

      const decrease = () => {
        store.mutations.decrease();
      };

      return {
        count,
        increase,
        decrease,
        countTripled,
        color
      };
    },
  };
</script>

<style lang="scss" scoped>
  .home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  h1 {
    margin-top: 16px;
    text-align: center;
  }

  .count {
    margin-top: 32px;
    font-size: 60px;
    text-align: center;
  }

  .change-count {
    margin: 32px 0;
    display: flex;
    justify-content: center;
    gap: 32px;

    i {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: #f1f1f1;
      font-size: 40px;
    }
  }

  .cod {
    display: flex;
    flex-direction: column;

    p {
      font-size: 32px;
      text-align: center;
    }

    input {
      margin: 16px 0;
      padding: 6px;

      &:focus {
        outline: none;
      }
    }
  }
</style>
