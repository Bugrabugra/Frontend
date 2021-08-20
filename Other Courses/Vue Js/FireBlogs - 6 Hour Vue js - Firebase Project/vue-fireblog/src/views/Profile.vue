<template>
  <div class="profile">
    <Modal v-if="modalActive" :modal-message="modalMessage" @close-modal="closeModal"/>
    <div class="container">
      <h2>Account Settings</h2>
      <div class="profile-info">
        <div class="initials">
          {{profileInitials}}
        </div>
        <div class="admin-badge">
          <svg focusable="false" data-prefix="fal" data-icon="user-crown" class="icon svg-inline--fa fa-user-crown fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path fill="currentColor" d="M313.6 320c-28.71 0-42.6 16-89.6 16-47.09 0-60.82-16-89.6-16C60.17 320 0 380.17 0 454.4v9.6c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48v-9.6c0-74.23-60.17-134.4-134.4-134.4zM416 464c0 8.82-7.18 16-16 16H48c-8.82 0-16-7.18-16-16v-9.6C32 397.94 77.94 352 134.4 352c19.38 0 39.33 16 89.6 16 49.4 0 70.66-16 89.6-16 56.46 0 102.4 45.94 102.4 102.4v9.6zM224 288c70.7 0 128-57.31 128-128V0l-64 32-64-32-64 32L96 0v160c0 70.69 57.31 128 128 128zM128 51.78l32 16 64-32 64 32 32-16V112H128V51.78zm0 92.22h192v16c0 52.93-43.06 96-96 96s-96-43.07-96-96v-16z"></path>
          </svg>
          <span>admin</span>
        </div>

        <div class="input">
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="firstName">
        </div>

        <div class="input">
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="lastName">
        </div>

        <div class="input">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username">
        </div>

        <div class="input">
          <label for="email">Email:</label>
          <input disabled type="text" id="email" v-model="email">
        </div>

        <button @click="updateProfile">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Modal from "../components/Modal";
  import {ref, computed} from "vue";
  import {useStore} from "vuex";


  export default {
    name: "Profile",
    components: {Modal},
    setup() {
      // Store
      const store = useStore();

      // References
      const modalMessage = ref("Changes were saved!");
      const modalActive = ref(null);

      // Computed
      const profileInitials = computed(() => {
        return store.state.profileInitials;
      });

      const firstName = computed({
        get() {
          return store.state.profileFirstName;
        },
        set(payload) {
          store.commit("changeFirstName", payload);
        }
      });

      const lastName = computed({
        get() {
          return store.state.profileLastName;
        },
        set(payload) {
          store.commit("changeLastName", payload);
        }
      });

      const username = computed({
        get() {
          return store.state.profileUsername;
        },
        set(payload) {
          store.commit("changeUsername", payload);
        }
      });

      const email = computed(() => {
        return store.state.profileEmail;
      });

      // Methods
      const closeModal = () => {
        modalActive.value = !modalActive.value;
      };

      const updateProfile = () => {
        store.dispatch("updateUserSettings");
        modalActive.value = !modalActive.value;
      };

      return {
        profileInitials, modalMessage, modalActive, closeModal,
        firstName, lastName, username, email, updateProfile
      }
    }
  }
</script>

<style lang="scss" scoped>
  .profile {
    .container {
      max-width: 1000px;
      padding: 60px 25px;

      h2 {
        text-align: center;
        margin-bottom: 16px;
        font-weight: 300;
        font-size: 32px;
      }

      .profile-info {
        border-radius: 8px;
        box-shadow:
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        padding: 32px;
        background-color: #f1f1f1;
        display: flex;
        flex-direction: column;
        max-width: 600px;
        margin: 32px auto;

        .initials {
          position: initial;
          width: 80px;
          height: 80px;
          font-size: 32px;
          background-color: #303030;
          color: #fff;
          display: flex;
          align-self: center;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .admin-badge {
          display: flex;
          align-self: center;
          color: #fff;
          font-size: 14px;
          padding: 8px 24px;
          border-radius: 8px;
          background-color: #303030;
          margin: 16px 0;
          text-align: center;
          text-transform: capitalize;

          .icon {
            width: 14px;
            height: auto;
            margin-right: 8px;
          }
        }

        .input {
          margin: 16px 0;

          label {
            font-size: 14px;
            display: block;
            padding-bottom: 6px;
          }

          input {
            width: 100%;
            border: none;
            background-color: #f2f7f6;
            padding: 8px;
            height: 50px;

            @media (min-width: 900px) {

            }

            &:focus {
              outline: none;
            }
          }
        }

        button {
          align-self: center;
        }
      }
    }
  }
</style>