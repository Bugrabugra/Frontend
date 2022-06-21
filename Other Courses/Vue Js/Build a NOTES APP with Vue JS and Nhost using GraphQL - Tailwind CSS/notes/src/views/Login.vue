<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useSignInEmailPassword, useSignUpEmailPassword } from "@nhost/vue";


  const router = useRouter();
  const isRegister = ref(false);
  const email = ref("");
  const password = ref("");

  const { signUpEmailPassword } = useSignUpEmailPassword();
  const { signInEmailPassword } = useSignInEmailPassword();

  const registerOrLogin = async () => {
    if (!email.value || !password.value) {
      return alert("Please fill in all the fields!");
    }

    const res = isRegister.value
        ? await signUpEmailPassword(email.value, password.value)
        : await signInEmailPassword(email.value, password.value);

    if (res.isError) {
      return alert(res.error.message);
    }

    router.push("/");
  };
</script>

<template>
  <main>
    <h1 class="text-4xl font-bold mb-8">My Notes App</h1>
    <form @submit.prevent="registerOrLogin">
      <h3>Login or Register</h3>
      <label>
        <input v-model="isRegister" type="checkbox"> Register?
      </label>

      <label class="block mb-4">
        <span class="block text-sm uppercase mb-2">Email</span>
        <input
            v-model="email"
            class="block w-full text-slate-800 px-4 py-2"
            placeholder="Enter your email"
            type="email"
        >
      </label>

      <label class="block mb-4">
        <span class="block text-sm uppercase mb-2">Password</span>
        <input
            v-model="password"
            class="block w-full text-slate-800 px-4 py-2"
            placeholder="Enter your email"
            type="password"
        >
      </label>

      <input class="text-green-500 hover:underline cursor-pointer" type="submit" value="Login or Signup">
    </form>
  </main>
</template>
