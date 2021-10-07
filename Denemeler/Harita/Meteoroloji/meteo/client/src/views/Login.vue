<template>
  <div class="min-h-screen flex justify-center bg-gradient-to-b
              from-blue-300 to-green-300">
    <div class="mt-10 w-60">
      <div class="flex flex-col space-y-4 bg-red-400 px-4 py-2 rounded-xl
                  shadow-2xl">
        <div>
          <p class="font-semibold text-gray-200 leading-loose tracking-wide">
            Kullanıcı adı:
          </p>
          <input
              type="text"
              class="users-input shadow-md w-full"
              v-model="username"
          >
          <p v-if="errorUsername" class="text-blue-700 text-sm mt-1">
            *{{errorUsername}}
          </p>
        </div>

        <div>
          <p class="font-semibold text-gray-200 leading-loose tracking-wide">
            Şifre:
          </p>
          <input
              type="password"
              class="users-input shadow-md w-full"
              v-model="password"
          >
          <p v-if="errorPassword" class="text-blue-700 text-sm mt-1">
            *{{errorPassword}}
          </p>
        </div>

        <div class="flex justify-center">
          <button
              @click.prevent="login"
              class="users-button bg-blue-300 w-24 shadow-md"
          >
            Giriş
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {useStore} from "vuex";
  import {ref} from "vue";
  import {useRouter} from "vue-router"

  // store
  const store = useStore();

  // router
  const router = useRouter();

  // references
  const username = ref("");
  const password = ref("");
  const errorUsername = ref("");
  const errorPassword = ref("");

  // methods
  const login = async () => {
    // clear inputs
    errorUsername.value = "";
    errorPassword.value = "";

    const result = await store.dispatch(
        "auth/loginUser",
        {username: username.value, password: password.value}
    );

    console.log(result);

    if (result.username) {
      await router.replace("/");
    }

    if (result.errorUsername) {
      errorUsername.value = result.errorUsername;
    }
    if (result.errorPassword) {
      errorPassword.value = result.errorPassword;
    }
  }
</script>