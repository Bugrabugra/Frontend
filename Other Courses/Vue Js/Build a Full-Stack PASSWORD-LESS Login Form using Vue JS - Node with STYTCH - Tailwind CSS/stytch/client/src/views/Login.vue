<script setup>
  import { ref } from "vue";
  import vm from "../main";


  const email = ref("");
  const isSubmitting = ref(false);
  const LoginOrCreate = async () => {
    isSubmitting.value = true;

    if (!email.value) {
      alert("Please enter an email address");
    }

    const response = await fetch("http://localhost:5000/loginorcreate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email.value
      })
    }).then((res) => res.json());

    if (response.success) {
      vm.$toast.success(response.message);
    } else {
      vm.$toast.error(response.message);
    }

    isSubmitting.value = false;
  }
</script>

<template>
  <main class="login min-h-screen bg-gradient-to-br from-green-500 to-cyan-400">
    <section class="container mx-auto pt-16 pb-4 px-4">
      <h1 class="text-4xl mb-8 text-center font-black uppercase">Password-less Login</h1>

      <form @submit.prevent="LoginOrCreate" class="bg-gray-700 max-w-md mx-auto rounded p-4">
        <label for="" class="block mb-2">
          <span class="block text-gray-400 mb-2">Enter your email address</span>
          <input
              type="email"
              placeholder="e.g johndoe@example.com"
              v-model="email"
              :disabled="isSubmitting"
              class="block w-full rounded bg-gray-800 py-2 px-4 disabled:opacity-50"
          >
        </label>

        <div class="flex justify-end items-center">
          <input
              type="submit"
              value="Login"
              :disabled="isSubmitting"
              class="inline-block bg-emerald-400 text-lg text-gray-800 font-bold uppercase rounded px-4 py-2 cursor-pointer"
          >
        </div>
      </form>
    </section>
  </main>
</template>
