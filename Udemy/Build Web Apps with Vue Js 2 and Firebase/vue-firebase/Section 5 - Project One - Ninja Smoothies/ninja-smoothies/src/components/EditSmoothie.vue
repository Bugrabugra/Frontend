<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h2>Edit {{smoothie.title}} Smoothie</h2>
    <form v-on:submit.prevent="editSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title:</label>
        <input type="text" name="title" v-model="smoothie.title" id="title">
      </div>

      <div v-for="(ingredient, index) in smoothie.ingredients" v-bind:key="index" class="field">
        <label for="ingredient">Ingredient: </label>
        <input type="text" name="ingredient" v-model="smoothie.ingredients[index]" id="ingredient">
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
        <button class="btn pink">Update Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
  import db from "../firebase/init";
  import slugify from "slugify";


  export default {
    name: "EditSmoothie",
    data() {
      return {
        smoothie: null,
        another: null,
        feedback: null
      }
    },
    created() {
      let ref = db.collection("smoothies")
        .where("slug", "==", this.$route.params.smoothie_slug)
      ref.get().then(snapshot => {
        snapshot.forEach(doc => {
          this.smoothie = doc.data();
          this.smoothie.id = doc.id;
        })
      })
    },
    methods: {
      addIngredient() {
        if (this.another) {
          this.smoothie.ingredients.push(this.another);
          this.another = null;
          this.feedback = null;
        } else {
          this.feedback = "You must enter a value to add an ingredient";
        }
      },
      deleteIngredient(ing) {
        this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
          return ingredient !== ing;
        })
      },
      editSmoothie() {
        if (this.smoothie.title) {
          this.feedback = null;
          // Create slug
          this.smoothie.slug = slugify(this.smoothie.title, {
            replacement: "-",
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
          })
          db.collection("smoothies").doc(this.smoothie.id).update({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug: this.smoothie.slug
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
      }
    }
  }
</script>

<style scoped>
  .edit-smoothie {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
  }

  .edit-smoothie h2 {
    font-size: 2em;
    margin: 20px auto;
  }

  .edit-smoothie .field {
    margin: 20px auto;
    position: relative;
  }

  .edit-smoothie .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
  }
</style>
