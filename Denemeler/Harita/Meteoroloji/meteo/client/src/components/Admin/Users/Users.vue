<template>
  <POIListModal
      v-if="showPOIList"
      :selectedUser="selectedUser"
  />
  <WarningListModal
      v-if="showWarningList"
      :selectedUser="selectedUser"
  />
  <div class="bg-gray-100 rounded-b-xl shadow-2xl">
    <div class="px-4 py-2">
      <!--header-->
      <h2 class="text-xl font-bold text-gray-600">
        Kullanıcı yaratma/düzenleme
      </h2>

      <!--crud menu-->
      <div class="mt-2 border border-gray-400 rounded-xl px-2 py-2
      grid grid-cols-12 gap-y-2 gap-x-2">
        <div class="col-span-12 md:col-span-10 flex flex-col flex-nowrap space-y-1">
          <!--username-->
          <div class="flex">
            <label class="w-1/3 py-1 font-bold text-gray-700" for="user-name">Kullanıcı adı:</label>
            <input class="w-2/3 users-input" type="text" v-model="inputUsername" id="user-name"/>
          </div>
          <p class="text-xs text-red-600" v-if="errorUsername">
            *{{errorUsername["message"]}}
          </p>

          <!--email-->
          <div class="flex">
            <label class="w-1/3 py-1 font-bold text-gray-700" for="email">E-mail:</label>
            <input class="w-2/3 users-input" type="text" v-model="inputEmail" id="email"/>
          </div>
          <div class="text-xs text-red-600" v-if="errorEmail">
            *{{errorEmail["message"]}}
          </div>

          <!--password-->
          <div class="flex">
            <label class="w-1/3 py-1 font-bold text-gray-700" for="password">Şifre:</label>
            <input class="w-2/3 users-input" type="password" v-model="inputPassword" id="password"/>
          </div>
          <p class="text-xs text-red-600" v-if="errorPassword">
            *{{errorPassword["message"]}}
          </p>

          <!--phone number-->
          <div class="flex">
            <label class="w-1/3 py-1 font-bold text-gray-700" for="phone">Telefon numarası:</label>
            <input class="w-2/3 users-input" placeholder="0-5XX-XXXXXXX"
                   type="text" v-model="inputPhoneNumber" id="phone"/>
          </div>
          <p class="text-xs text-red-600" v-if="errorPhoneNumber">
            *{{errorPhoneNumber["message"]}}
          </p>

          <!--name-->
          <div class="flex">
            <label class="w-1/3 py-1 font-bold text-gray-700" for="name">Ad:</label>
            <input class="w-2/3 users-input" type="text" v-model="inputName" id="name">
          </div>
          <p class="text-xs text-red-600" v-if="errorName">
            *{{errorName["message"]}}
          </p>

          <!--surname-->
          <div class="flex">
            <label class="w-1/3 py-1 font-bold text-gray-700" for="surname">Soyad:</label>
            <input class="w-2/3 users-input" type="text" v-model="inputSurname" id="surname">
          </div>
          <p class="text-xs text-red-600" v-if="errorSurname">
            *{{errorSurname["message"]}}
          </p>

          <!--admin-->
          <div class="flex items-center">
            <label class="w-1/3 py-1 font-bold text-gray-700" for="admin">Yönetici:</label>
            <input class="w-2/3 h-4 w-4" type="checkbox" v-model="inputAdmin" id="admin">
          </div>

          <!--pois-->
          <div class="flex items-center">
            <label class="w-1/3 py-1 font-bold text-gray-700">Bölgeleri:</label>
            <button class="users-button bg-indigo-400 hover:bg-indigo-500
                       text-indigo-700 hover:text-indigo-100"
                    @click="openPOIsList"
            >
              Bölgeleri tanımla
            </button>
          </div>

          <!--defined pois-->
          <!--<div class="flex items-center">-->
          <!--  <label class="w-1/3 py-1 font-bold text-gray-700">Tanımlanan bölgeler:</label>-->
          <!--  <p>{{inputPOIs}}</p>-->
          <!--</div>-->

          <!--warnings-->
          <div class="flex items-center">
            <label class="w-1/3 py-1 font-bold text-gray-700">Uyarıları:</label>
            <button class="users-button bg-indigo-400 hover:bg-indigo-500
                       text-indigo-700 hover:text-indigo-100"
                    @click="openWarningsList"
            >
              Uyarıları tanımla
            </button>
          </div>

          <!--defined warnings-->
          <!--<div class="flex items-center">-->
          <!--  <label class="w-1/3 py-1 font-bold text-gray-700">Tanımlanan uyarılar:</label>-->
          <!--  <p>{{inputWarnings}}</p>-->
          <!--</div>-->
        </div>

        <!--buttons-->
        <div class="col-span-12 md:col-span-2">
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
      <div class="mt-6 flex flex-wrap justify-between items-center">
        <h2 class="text-xl font-bold text-gray-600">
          Kullanıcılar
        </h2>

        <div class="flex justify-between items-center">
          <label for="search">Kullanıcı ara:</label>
          <input
              v-model="searchUserText"
              type="text"
              id="search"
              class="flex-1 ml-2 w-full users-input"
          >
        </div>
      </div>

      <!--users list-->
      <div class="mt-2 flex flex-col items-center justify-center border
                  border-gray-400 rounded-xl px-2 py-2">
        <ul class="w-full space-y-2 overflow-y-scroll h-48 md:h-[320px]">
          <li v-for="(user, index) in filteredUsers">
            <User
                @click="highlight(user, index)"
                :key="index"
                class="mr-2 scrollbar"
                :class="{
                  'bg-blue-200 border-2 border-gray-400 shadow-xl': index === indexClickedUser,
                  'bg-red-100 shadow-md border-2 border-red-200': index !== indexClickedUser,
                  'bg-red-200 shadow-md border-2 border-red-400': user.admin
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
  import POIListModal from "./POIListModal.vue";
  import WarningListModal from "./WarningListModal.vue";

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
  const inputAdmin = ref(false);
  const inputPOIs = ref(null);
  const inputWarnings = ref(null);

  const vuelidateErrors = ref([]);

  // computed
  const showPOIList = computed(() => {
    return store.state.users.isSelectPOIListModalOpen;
  });

  const showWarningList = computed(() => {
    return store.state.users.isSelectWarningListModalOpen;
  });

  const users = computed(() => {
    return store.state.users.users;
  });

  const filteredUsers = computed(() => {
    return users.value.filter(user => {
      return user.username.toLowerCase().includes(searchUserText.value.toLowerCase());
    });
  });

  const selectedUser = computed(() => {
    if (store.state.users.selectedUser) {
      return store.state.users.selectedUser;
    } else {
      return null;
    }
  });

  const selectedPOIsList = computed(() => {
    return store.state.users.selectedPOIsList;
  });

  const selectedWarningsList = computed(() => {
    return store.state.users.selectedWarningsList;
  });

  // vuelidate rules
  const vuelidateRules = computed(() => {
    return {
      inputUsername: {
        required: helpers.withMessage(
            "Kullanıcı adı girilmelidir",
            required
        )
      },
      inputEmail: {
        email: helpers.withMessage(
            "E-mail formatı yanlıştır",
            email
        ),
        required: helpers.withMessage(
            "Email girilmelidir",
            required
        )
      },
      inputPassword: {
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

  const errorUsername = computed(() => {
    return vuelidateErrors.value.filter(error => {
      if (error.property === 'inputUsername') {
        return error.message;
      }
    })[0];
  });

  const errorEmail = computed(() => {
    return vuelidateErrors.value.filter(error => {
      if (error.property === 'inputEmail') {
        return error.message;
      }
    })[0];
  });

  const errorPassword = computed(() => {
    return vuelidateErrors.value.filter(error => {
      if (error.property === 'inputPassword') {
        return error.message;
      }
    })[0];
  });

  const errorPhoneNumber = computed(() => {
    return vuelidateErrors.value.filter(error => {
      if (error.property === 'inputPhoneNumber') {
        return error.message;
      }
    })[0];
  });

  const errorName = computed(() => {
    return vuelidateErrors.value.filter(error => {
      if (error.property === 'inputName') {
        return error.message;
      }
    })[0];
  });

  const errorSurname = computed(() => {
    return vuelidateErrors.value.filter(error => {
      if (error.property === 'inputSurname') {
        return error.message;
      }
    })[0];
  });

  // methods
  const openPOIsList = () => {
    store.commit("users/setSelectPOIsModalOpen", true);
  };

  const openWarningsList = () => {
    store.commit("users/setSelectWarningsModalOpen", true);
  };

  const v$ = useVuelidate(vuelidateRules, {
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
      console.log(vuelidateErrors.value)

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
    vuelidateErrors.value = [];
    v$.value.$validate();
    console.log(v$.value);
    v$.value.$errors.forEach(error => {
      vuelidateErrors.value.push({property: error.$property, message: error.$message})
    });
    console.log(vuelidateErrors.value);

    if (!v$.value.$error) {
      const user = {
        username: inputUsername.value,
        email: inputEmail.value,
        password: inputPassword.value,
        phone_number: inputPhoneNumber.value,
        name: inputName.value,
        surname: inputSurname.value,
        is_admin: inputAdmin.value,
        poi_responsibilities: inputPOIs.value,
        warnings_to_receive: inputWarnings.value
      };
      const result = await store.dispatch("users/createUser", user);
      await CRUDResultHandler(result);
    } else {

    }
  };

  const editUser = async () => {
    vuelidateErrors.value = [];
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
        surname: inputSurname.value,
        is_admin: inputAdmin.value,
        poi_responsibilities: inputPOIs.value,
        warnings_to_receive: inputWarnings.value
      };

      console.log("USER: ", user);

      const result = await store.dispatch(
          "users/editUser",
          {id: selectedUser.value.id, user: user}
      );

      await CRUDResultHandler(result);
    } else {

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
    clear();
    indexClickedUser.value = index;
    store.commit("users/setSelectedUser", user);
    console.log(user)
    vuelidateErrors.value = [];
  };

  const clear = () => {
    // clear input boxes
    inputUsername.value = "";
    inputEmail.value = "";
    inputPassword.value = "";
    inputPhoneNumber.value = "";
    inputName.value = "";
    inputSurname.value = "";
    inputAdmin.value = null;
    inputPOIs.value = null;
    inputWarnings.value = null;

    searchUserText.value = "";
    store.commit("users/setSelectedUser", null);
    store.commit("users/setSelectedPOIsList", null);
    store.commit("users/setSelectedWarningsList", null);

    // clear highlight
    indexClickedUser.value = null;

    vuelidateErrors.value = [];
  }

  watch(
      [selectedUser, selectedPOIsList, selectedWarningsList],
      ([newSelectedUser, newSelectedPOIsList, newSelectedWarningsList]) => {
        if (newSelectedUser !== null) {
          inputUsername.value = newSelectedUser.username;
          inputEmail.value = newSelectedUser.email;
          inputPhoneNumber.value = newSelectedUser.phone_number;
          inputName.value = newSelectedUser.name;
          inputSurname.value = newSelectedUser.surname;
          inputAdmin.value = newSelectedUser.is_admin;
          inputPOIs.value = newSelectedUser.poi_responsibilities;
          inputWarnings.value = newSelectedUser.warnings_to_receive;
        }

        if (newSelectedPOIsList !== null) {
          inputPOIs.value = newSelectedPOIsList;
        }

        if (newSelectedWarningsList !== null) {
          inputWarnings.value = newSelectedWarningsList;
        }
  })
</script>