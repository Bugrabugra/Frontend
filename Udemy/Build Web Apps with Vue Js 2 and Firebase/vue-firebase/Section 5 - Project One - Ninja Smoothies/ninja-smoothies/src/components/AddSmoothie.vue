<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
    <form v-on:submit.prevent="addSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title:</label>
        <input type="text" name="title" v-model="title" id="title">
      </div>

      <div v-for="(ingredient, index) in ingredients" v-bind:key="index" class="field">
        <label for="ingredient">Ingredient: </label>
        <input type="text" name="ingredient" v-model="ingredients[index]" id="ingredient">
        <i class="material-icons delete" v-on:click="deleteIngredient(ingredient)">delete</i>
      </div>

      <div class="field add-ingredient">
        <label for="add-ingredient">Add an Ingredient</label>
        <input type="text"
               name="add-ingredient"
               id="add-ingredient"
               v-on:keydown.tab.prevent="addIngredient"
               v-model="another">
      </div>

      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <button class="btn pink">Add Smoothie</button>
      </div>
    </form>
  </div>

</template>

<script>
  import db from "../firebase/init";
  import slugify from "slugify";


  export default {
    name: "AddSmoothie",
    data() {
      return {
        title: null,
        another: null,
        ingredients: [],
        feedback: null,
        slug: null
      }
    },
    methods: {
      addSmoothie() {
        if (this.title) {
          this.feedback = null;
          // Create slug
          this.slug = slugify(this.title, {
            replacement: "-",
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
          })
          db.collection("smoothies").add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug
          })
            .then(() => {
              this.$router.push({name: "Index"});
            })
            .catch(err => {
              console.log(err);
            })
        } else {
          this.feedback = "You must enter a smoothie title";
        }
      },
      addIngredient() {
        if (this.another) {
          this.ingredients.push(this.another);
          this.another = null;
          this.feedback = null;
        } else {
          this.feedback = "You must enter a value to add an ingredient";
        }
      },
      deleteIngredient(ing) {
        this.ingredients = this.ingredients.filter(ingredient => {
          return ingredient !== ing;
        })
      }
    }
  }
</script>

<style scoped>
  .add-smoothie {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
  }

  .add-smoothie h2 {
    font-size: 2em;
    margin: 20px auto;
  }

  .add-smoothie .field {
    margin: 20px auto;
    position: relative;
  }

  .add-smoothie .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
  }
</style>
