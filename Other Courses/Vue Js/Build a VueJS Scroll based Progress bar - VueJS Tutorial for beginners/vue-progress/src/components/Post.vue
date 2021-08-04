<template>
  <article ref="article">
    <div class="content">
      <h2>The Article Title</h2>
      <h3>Subscribe to channel</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam corporis cupiditate, debitis eaque eligendi
         error et eveniet maxime minus quae sunt unde vero voluptates? Aliquam aliquid aperiam culpa cupiditate dolore
         doloribus eligendi eum excepturi exercitationem illo iure molestias, pariatur quam quasi quod quos reiciendis,
         sed temporibus totam voluptatem. Necessitatibus, sequi.</p>
      <p>Ad cum, eius eum expedita laborum nobis provident suscipit. Corporis cum cupiditate, dignissimos enim eos ex
         fuga inventore ipsum itaque molestiae nihil nulla obcaecati odit quam quod reprehenderit similique sit totam
         veniam voluptas. Deserunt dolores iste itaque laborum pariatur quaerat quia? Ad dicta error esse ipsa quo saepe
         ut voluptatibus!</p>
      <p>Animi asperiores dolor illum labore laudantium perspiciatis quod sunt voluptate voluptatum. Atque eligendi eos
         et numquam totam! Animi assumenda commodi consequuntur dignissimos eos incidunt ipsa laborum nihil, porro
         possimus repellendus, temporibus voluptatibus voluptatum. Accusamus ad assumenda autem commodi dolores est
         fugiat nihil obcaecati. Accusamus dolorem ipsam magni maiores, minus nihil.</p>
      <p>Alias atque error facere maiores maxime molestias natus nemo, perspiciatis, quia reiciendis rerum tempora. Ab
         aperiam asperiores aut, dicta distinctio dolores eaque est expedita laudantium neque odio, optio quasi sed
         ullam voluptate. Alias at consectetur consequatur culpa deserunt, distinctio magnam maiores nesciunt odit quae
         quibusdam ratione, sapiente sunt, tenetur voluptas?</p>
      <p>Accusamus ad aperiam architecto, harum modi quo repellat. Aliquam amet, deleniti dolore ea esse facere fuga
         laboriosam maxime modi nemo praesentium quae quam, quod, recusandae reiciendis repellat sapiente sint unde
         veritatis voluptates! Architecto aspernatur culpa esse exercitationem ipsum quia rem sit? Adipisci autem
         laboriosam magni molestiae non pariatur provident sunt.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab blanditiis consequuntur cum cumque cupiditate,
         dicta doloribus, ducimus earum error esse eum, exercitationem explicabo fugit impedit ipsam itaque laborum
         laudantium magni maxime neque nisi non nulla omnis optio placeat provident quae qui quis reprehenderit rerum
         saepe sequi sint sit totam ut vitae voluptatibus. Accusantium adipisci aliquid at blanditiis culpa delectus
         deserunt dicta dignissimos dolor ea eos error ex expedita fuga iste labore laborum minus neque officiis optio
         perspiciatis quam quidem reiciendis repellat reprehenderit saepe, sed sint sit tempora tempore totam, ullam vel
         voluptas? Aspernatur excepturi itaque necessitatibus. Dolorum ipsa qui similique.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus architecto assumenda atque cupiditate
         deleniti dolorum ea eaque enim eos error est et eveniet excepturi exercitationem explicabo, hic id illo
         laudantium libero magni minima minus molestiae nisi numquam quaerat quis quo quod recusandae reiciendis saepe
         sed soluta tempora tenetur unde ut voluptas! Fuga maxime, mollitia. Accusamus accusantium aliquam, architecto
         atque enim est incidunt laboriosam nesciunt omnis pariatur vel voluptatem voluptatibus?</p>
      <p>Architecto incidunt minima minus molestiae quis quisquam sed unde. Molestias, natus sint. Dignissimos dolores
         magnam nostrum perferendis quas unde veniam! Alias deserunt ducimus eius eligendi labore laborum maxime minima
         modi nihil officia provident quae quaerat, quidem, sapiente suscipit temporibus unde. Aperiam assumenda at
         beatae debitis harum minima minus, non odio perferendis praesentium, quos recusandae velit voluptates. Beatae
         distinctio, error ex fuga illum minima possimus quaerat, quas, reiciendis saepe sequi veritatis?</p>
      <p>Adipisci alias amet at consequatur consequuntur cumque delectus ea eaque error ex excepturi, exercitationem
         illum impedit labore minima modi nam necessitatibus nobis non numquam obcaecati odio optio porro possimus
         quisquam quod repellendus reprehenderit repudiandae sed sint sit unde vel vero. Illo incidunt ipsa iste iure,
         quod sit veritatis vitae? Ab accusamus consequatur cupiditate enim esse est exercitationem hic, ipsum magni
         molestias natus necessitatibus, nihil nulla quasi quo rerum, tenetur vel.</p>
    </div>
  </article>
</template>

<script>
  import {ref, onMounted} from "vue";


  export default {
    name: "Post",
    setup(_, {emit}) {
      const article = ref(null);

      onMounted(() => {
        article.value.addEventListener("scroll", () => {
          const scrollTop = article.value.scrollTop;
          const clientHeight = article.value.clientHeight;
          const scrollHeight = article.value.scrollHeight;

          const scrollPercent = Math.round(scrollTop / (scrollHeight - clientHeight) * 100);
          emit("progressUpdate", scrollPercent);
        })
      });

      return {article}
    }
  }
</script>

<style scoped>
  article {
    width: 100%;
    flex: 1 1 100%;
    max-height: calc(100vh - 80px);
    background-color: #eee;
    overflow: scroll;
  }

  article .content {
    padding: 25px;
  }

  article .content h2 {
    color: #11224f;
    font-size: 32px;
    font-weight: 900;
    margin-bottom: 10px;
  }

  article .content h3 {
    color: #676767;
    font-size: 22px;
    font-weight: 300;
    margin-bottom: 30px;
  }

  article .content p {
    color: #313131;
    font-size: 18px;
    font-weight: 300;
    line-height: 1.5;
    margin-bottom: 15px;
  }
</style>