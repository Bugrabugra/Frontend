<template>
  <div>
    <header>
      <h1>My Anime Feed</h1>
    </header>
    <main>
      <Post v-for="(anime, index) in animeList" :key="index" :anime="anime"/>
    </main>
  </div>
</template>

<script setup>
  import Post from "./components/Post.vue";
  import {onMounted, ref} from "vue";


  const animeList = ref([]);

  const getAnime = () => {
    const animeTitles = [
      "Naruto",
      "Demon Slayer",
      "Dragon Ball",
      "My Hero Academia",
      "Sword Art Online",
      "Tokyo Ghoul",
      "Darling in the Franxx",
      "Code Geass",
      "One Piece",
      "Fairy Tail",
      "Bleach",
      "Attack on Titan",
      "Hunter x Hunter",
    ];

    const anime = [];

    for (let i = 0; i < 10; i++) {
      anime.push({
        title: animeTitles[Math.floor(Math.random() * animeTitles.length)],
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. " +
            "Accusantium ad alias aliquam, animi aspernatur commodi consequuntur " +
            "distinctio dolor exercitationem fugiat, neque nesciunt omnis possimus " +
            "quaerat quod ratione repellat, ut veritatis. Cupiditate dignissimos " +
            "dolorem natus necessitatibus odit provident reiciendis tenetur voluptas."
      })
    }

    return anime;
  };
  
  const handleScroll = () => {
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 50) {
      const newAnime = getAnime();
      animeList.value = [...animeList.value, ...newAnime];
    }
  };

  onMounted(() => {
    animeList.value = getAnime();
    window.addEventListener("scroll", handleScroll);
  })


</script>

<style>
  * {
    margin: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Avenir LT Std", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #eee;
    background-color: #2c3e50;
    min-height: 100vh;
    padding-top: 3rem;
  }

  header h1 {
    text-align: center;
  }

  header {
    margin-bottom: 2rem;
  }

  main {
    padding: 0 2rem;
    max-width: 640px;
    margin: 0 auto;
  }
</style>
