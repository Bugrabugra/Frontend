<template>
  <div id="app">
    <header>
      <h1>VUE<span>CORDION</span></h1>
    </header>

    <div class="faqs">
      <Faq
          v-for="(faq, index) in faqs"
          :key="index"
          :faq="faq"
          :index="index"
          :open="faq.open"
          @click="toggleOpen(index)"
      />
    </div>
  </div>
</template>

<script>
  import {ref} from "vue";
  import Faq from "./components/Faq";


  export default {
    name: 'App',
    components: {Faq},
    setup() {
      const faqs = ref([
        {
          question: "Who is the best Superhero?",
          answer: "I'm not sure but we love him 3000",
          open: false
        },
        {
          question: "What is Goku's form called with White Hair?",
          answer: "Mastered Ultra Instinct",
          open: false
        },
        {
          question: "Have you liked & subscribed yet?",
          answer: "Yes",
          open: false
        }
      ]);

      const toggleOpen = (index) => {
        faqs.value = faqs.value.map((faq, i) => {
          if (index === i) {
            faq.open = !faq.open;
          } else {
            faq.open = false;
          }
          return faq;
        })
      };

      return {faqs, toggleOpen}
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #eee;
    font-family: sans-serif;
  }

  header {
    background-color: #3c3c3c;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
  }

  header h1 {
    color: #eee;
    font-size: 28px;
    font-weight: 300;
    text-transform: uppercase;
  }

  header h1 span {
    color: #56e3b8;
    font-weight: 700;
  }

  .faqs {
    margin: 10px;
  }

  .faq {
    display: block;
    width: 100%;
    max-width: 768px;
    margin: 15px auto;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background-color: #fff;
  }

  .faq .question {
    position: relative;
    color: #3c3c3c;
    font-size: 20px;
    transition: all 0.4s linear;
  }

  .faq .question::after {
    content: "";

    position: absolute;
    top: 50%;
    right: 0;
    transform:
        translateY(-50%)
        rotate(0);
    width: 30px;
    height: 30px;
    background-image: url("./assets/arrow-down-mint.svg");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;

    transition: all 0.2s linear;
  }

  .faq.open .question {
    margin-bottom: 15px;
  }

  .faq.open .question::after {
    transform:
        translateY(-50%)
        rotate(-180deg);
  }

  .faq .answer {
    color: #3c3c3c;
    font-size: 18px;
    opacity: 0;
    max-height: 0;
    overflow-y: hidden;
    transition: all 0.4s ease-out;
  }

  .faq.open .answer {
    opacity: 1;
    max-height: 1000px;
  }
</style>
