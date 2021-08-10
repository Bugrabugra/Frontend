<template>
  <div id="app">
    <nav v-sticky:bottom.light>
      <h3>Custom<span>Directives</span></h3>
    </nav>
    <section>
      <h3 v-color="'rgba(0, 0, 0, 0.2)'">Lorem Ipsum Dolor elit</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum modi mollitia laborum totam delectus, tempore
        aliquid, at quod sint magni nam itaque vitae dolores, doloremque atque eligendi maiores eaque est.
        <br><br>
        Animi, et placeat? Quae excepturi reiciendis et quibusdam voluptate. Deleniti adipisci veritatis odit tenetur
        sequi. Consequatur, optio eaque. Sequi, similique error? Quam soluta quisquam voluptatum natus laudantium
        consequuntur accusantium non!
        <br><br>
        Distinctio fuga sequi tenetur, consequuntur recusandae nulla omnis odit perspiciatis consequatur quas vero atque
        illo nobis odio dicta voluptatibus est, eligendi quis minima doloremque debitis in! Eius, quo. Tenetur,
        obcaecati?
        Fugiat sint laboriosam possimus nemo libero, deleniti dolor. Nihil aliquid nostrum quas. Adipisci autem
        praesentium ducimus cumque ullam! Obcaecati, porro ullam ea explicabo quia quas impedit laborum? Non, similique
        eos!
        Magnam qui unde enim rerum at eaque nam perferendis cumque non. Rem, labore sint deserunt, eligendi perspiciatis
        nostrum exercitationem eos earum esse inventore ipsa, beatae perferendis nihil architecto. Neque, vitae?
        Ab aspernatur recusandae obcaecati, quas perspiciatis dolore quam voluptatibus molestias dolores in sint eum
        officia eveniet maxime temporibus tempora molestiae ipsum soluta suscipit rem sequi voluptates consequatur!
        Soluta, quasi voluptatem.
        <br><br>
        Eveniet distinctio at neque aut sequi ea, consequuntur corrupti ullam fugiat? Nulla maiores dolorem, in
        asperiores facere reiciendis expedita ut neque quos recusandae ratione quibusdam voluptates ipsam ea sed
        molestiae.
        Magnam voluptatibus quae numquam dolor eveniet fuga. Sequi, ea, aliquid repellendus adipisci consectetur quaerat
        mollitia modi molestiae iusto ipsa labore consequuntur velit sed, nemo aliquam assumenda magnam fugiat veniam
        error?
        Perferendis aliquid earum deleniti consequuntur quo ratione laborum placeat laboriosam maiores eaque. Nesciunt
        eos ipsam accusantium repudiandae ipsa. Incidunt libero saepe itaque. Rem, ullam? Inventore dicta veniam omnis
        voluptatem similique.
        <br><br>
        Hic laudantium facilis, autem quidem odio assumenda velit harum earum. Fugiat, maiores quos suscipit tempora
        facere voluptates voluptate exercitationem error odio libero dolor, quod possimus cum, cumque iusto delectus
        illo.
      </p>
    </section>
  </div>
</template>

<script>
  export default {
    name: "app"
  };
</script>

<style>
  body {
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  nav {
    background: #171717;
    height: 60px;
  }

  nav h3 {
    color: #FFCE00;
    font-size: 28px;
    line-height: 60px;
    text-transform: uppercase;
    font-weight: 900;
    margin: 0;
  }

  nav h3 span {
    color: #FFFFFF;
    font-weight: 300;
  }

  section {
    padding: 15px;
  }

  section h3 {
    color: #171717;
    font-size: 22px;
  }
</style>
