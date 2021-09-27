<template>
  <div class="bg-gray-300 rounded-xl shadow-2xl">
    <div class="px-4 py-2">
      <!--header-->
      <h2 class="text-xl font-bold text-gray-600">
        Kullanıcı yaratma/düzenleme
      </h2>

      <!--crud menu-->
      <div class="border border-gray-400 rounded-xl px-2 py-2
      grid grid-cols-12 gap-y-2 gap-x-2">
        <div class="col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-3
                    2xl:col-span-4 flex flex-col flex-nowrap space-y-1">
          <p class="py-1 font-bold text-gray-700">Kullanıcı adı:</p>
          <p class="py-1 font-bold text-gray-700">E-mail:</p>
          <p class="py-1 font-bold text-gray-700">Şifre:</p>
          <p class="py-1 font-bold text-gray-700">Telefon numarası:</p>
          <p class="py-1 font-bold text-gray-700">Ad:</p>
          <p class="py-1 font-bold text-gray-700">Soyad:</p>
        </div>

        <div class="col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-7
                    2xl:col-span-6 flex flex-col flex-nowrap space-y-1">
          <!--username-->
          <input class="users-input" type="text" v-model="inputUsername">
          <!--email-->
          <input class="users-input" type="text" v-model="inputEmail">
          <!--password-->
          <input class="users-input" type="password" v-model="inputPassword">
          <!--phone number-->
          <input class="users-input" placeholder="0-5XX-XXXXXXX"
                 type="text" v-model="inputPhoneNumber">
          <!--name-->
          <input class="users-input" type="text" v-model="inputName">
          <!--surname-->
          <input class="users-input" type="text" v-model="inputSurname">
        </div>

        <div class="col-span-12 md:col-span-2 lg:col-span-2 xl:col-span-2
                    2xl:col-span-2">
          <div class="flex flex-row md:flex-col md:h-full flex-wrap w-full
                      space-x-2 md:space-x-0 md:space-y-2 justify-between">
            <!--create-->
            <button
                @click="createUser"
                :disabled="indexClickedUser !== null"
                class="users-button flex-1 bg-green-400 hover:bg-green-500
                       text-green-700 hover:text-green-100"
                :class="{
                  'disabled:bg-gray-200 disabled:text-green-700':
                  indexClickedUser !== null,
                }"
            >Oluştur</button>
            <!--edit-->
            <button
                @click="editUser"
                :disabled="indexClickedUser === null"
                class="users-button flex-1 bg-yellow-400 hover:bg-yellow-500
                       text-yellow-700 hover:text-yellow-100"
                :class="{
                  'disabled:bg-gray-200 disabled:text-green-700':
                  indexClickedUser === null,
                }"
            >Düzenle</button>
            <!--clear-->
            <button
                @click="clear"
                class="users-button flex-1 bg-blue-400 hover:bg-blue-500
                       text-blue-700 hover:text-blue-100"
            >Temizle</button>
            <!--delete-->
            <button
                @click="deleteUser"
                class="users-button flex-1 bg-red-400 hover:bg-red-500
                       text-red-700 hover:text-red-100"
            >Sil</button>
          </div>
        </div>
      </div>

      <!--header-->
      <div class="mt-6 flex justify-between items-center">
        <h2 class="text-xl font-bold text-gray-600">
          Kullanıcılar
        </h2>

        <!--TODO responsive patladı-->
        <div class="flex justify-between items-center space-x-4">
          <label for="search">Kullanıcı ara:</label>
          <input v-model="searchUserText" type="text" id="search" class="users-input">
        </div>
      </div>

      <!--users list-->
      <div class="mt-2 flex flex-col items-center justify-center border
      border-gray-400 rounded-xl px-2 py-2">
        <ul class="w-full space-y-2 overflow-y-scroll h-96 md:h-[500px]">
          <li v-for="(user, index) in filteredUsers">
            <User
                @click="highlight(user, index)"
                class="mr-2 scrollbar"
                :class="{
                'bg-blue-200 border-2 border-gray-400':
                index === indexClickedUser,
                'bg-gray-100': index !== indexClickedUser
                }"
                :user="user"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {ref, computed, watch} from "vue";
  import {useStore} from "vuex";
  import useVuelidate from "@vuelidate/core";
  import {helpers, required, email, minLength} from "@vuelidate/validators";
  import User from "./User.vue";

  // store
  const store = useStore();
  store.dispatch("users/getUsers");

  // references
  const indexClickedUser = ref(null);
  const searchUserText = ref("");

  const inputUsername = ref("");
  const inputEmail = ref("");
  const inputPassword = ref("");
  const inputPhoneNumber = ref("");
  const inputName = ref("");
  const inputSurname = ref("");

  const vuelidateErrors = ref([]);

  // computed
  const users = computed(() => {
    return store.state.users.users;
  });

  const filteredUsers = computed(() => {
    return users.value.filter(user => {
      return user.username.toLowerCase().includes(searchUserText.value.toLowerCase());
    });
  });

  const selectedUser = computed(() => {
    return store.state.users.userSelected;
  });

  // vuelidate rules
  const rules = computed(() => {
    return {
      inputUsername: {
        required: helpers.withMessage(
            "Kullanıcı adı girilmelidir",
            required
        )
      },
      inputEmail: {
        required: helpers.withMessage(
            "E-mail girilmelidir",
            required
        ),
        email: helpers.withMessage(
            "E-mail formatı yanlıştır",
            email
        )
      },
      inputPassword: {
        required: helpers.withMessage(
            "Şifre dolu olmalıdır",
            required
        ),
        minLength: helpers.withMessage(
            "En az 6 karakterlik bir şifre girmelisiniz",
            minLength(6)
        )
      },
      inputPhoneNumber: {
        required: helpers.withMessage(
            "Telefon numarası girilmelidir",
            required
        )
      },
      inputName: {
        required: helpers.withMessage(
            "Kullanıcının adı girilmelidir",
            required
        )
      },
      inputSurname: {
        required: helpers.withMessage(
            "Kullanıcının soyadı girilmelidir",
            required
        )
      }
    }
  });

  // methods
  const v$ = useVuelidate(rules, {
    inputUsername: inputUsername,
    inputEmail: inputEmail,
    inputPassword: inputPassword,
    inputPhoneNumber: inputPhoneNumber,
    inputName: inputName,
    inputSurname: inputSurname
  });

  const CRUDResultHandler = async (result) => {
    if (result.error) {
      console.log(result.error);
      // enable popup
      store.commit("general/setModal", true);
      // set popup content
      store.commit("general/setModalContent", `<p>${result.error}</p>`);
      // clear highlight
      indexClickedUser.value = null;
    } else {
      // if no errors, get users again
      await store.dispatch("users/getUsers");

      // clear input boxes
      clear();
    }
  }
  const createUser = async () => {
    v$.value.$validate();
    console.log(v$.value);
    v$.value.$errors.forEach(error => {
      vuelidateErrors.value.push(error.$message)
    });
    console.log(vuelidateErrors.value);

    if (!v$.value.$error) {
      const user = {
        username: inputUsername.value,
        email: inputEmail.value,
        password: inputPassword.value,
        phone_number: inputPhoneNumber.value,
        name: inputName.value,
        surname: inputSurname.value
      };
      const result = await store.dispatch("users/createUser", user);

      await CRUDResultHandler(result);
    } else {
      // enable popup
      store.commit("general/setModal", true);
      // set popup content
      // TODO errorü boşalt
      let error = "";
      vuelidateErrors.value.forEach(err => {
        error += `<p>${err}</p>`
      })
      console.log(error);
      store.commit(
          "general/setModalContent",
          error
      );
    }
  };

  const editUser = async () => {
    v$.value.$validate();
    console.log(v$.value);
    v$.value.$errors.forEach(error => {
      vuelidateErrors.value.push(error.$message)
    });
    console.log(vuelidateErrors.value);

    if (!v$.value.$error) {
      const user = {
        username: inputUsername.value,
        email: inputEmail.value,
        password: inputPassword.value,
        phone_number: inputPhoneNumber.value,
        name: inputName.value,
        surname: inputSurname.value
      };

      const result = await store.dispatch(
          "users/editUser",
          {id: selectedUser.value.id, user: user}
      );

      await CRUDResultHandler(result);
    } else {
      // enable popup
      store.commit("general/setModal", true);
      // set popup content
      let error = "";
      vuelidateErrors.value.forEach(err => {
        error += err + "<br/>"
      })
      store.commit(
          "general/setModalContent",
          error
      );
    }

  };

  const deleteUser = async () => {
    const result = await store.dispatch(
        "users/deleteUser",
        selectedUser.value.id
    );

    await CRUDResultHandler(result);
  };
  const highlight = (user, index) => {
    indexClickedUser.value = index;
    store.commit("users/setSelectedUser", user);
  };

  const clear = () => {
    // clear input boxes
    inputUsername.value = "";
    inputEmail.value = "";
    inputPassword.value = "";
    inputPhoneNumber.value = "";
    inputName.value = "";
    inputSurname.value = "";

    searchUserText.value = "";

    // clear highlight
    indexClickedUser.value = null;
  }

  watch(selectedUser, newValue => {
    inputUsername.value = newValue.username;
    inputEmail.value = newValue.email;
    inputPassword.value = newValue.password;
    inputPhoneNumber.value = newValue.phone_number;
    inputName.value = newValue.name;
    inputSurname.value = newValue.surname;
  })
</script>

<style scoped>

</style>