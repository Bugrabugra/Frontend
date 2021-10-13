<template>
  <div class="popup">
    <div class="content">
      <h4> Login to your account </h4>
      <input type="text" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button> Log in </button>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
  .popup {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content {
    min-width: 200px;
    width: 30%;
    background: #fff;
    height: 200px;
    padding: 10px;
    border-radius: 5px;
  }
  input[type="text"], input[type="password"] {
    border: 0;
    outline: 0;
    border-bottom: 1px solid #eee;
    width: 80%;
    margin: 0 auto;
    font-size: 1em;
    margin-bottom: 5px;
  }
  button {
    border: 0;
    margin-top: 50px;
    background-color:#8e44ad;
    color: #fff;
    padding: 5px 10px;
    font-size: 1em;
  }
</style>