<template>
  <div class="grid grid-cols-2 cursor-pointer rounded-xl px-2 py-1">
    <div class="col-span-1">
      <p class="font-semibold">Kullanıcı adı:</p>
      <p>{{user.username}}</p>
      <p class="font-semibold">Email:</p>
      <p>{{user.email}}</p>
    </div>

    <div class="col-span-1">
      <p class="font-semibold">Telefon:
        <span class="font-normal">{{user.phone_number}}</span>
      </p>
      <p class="font-semibold">Yönetici:
        <span class="font-normal">{{admin}}</span>
      </p>
      <p class="font-semibold">Adı Soyadı:</p>
      <p>{{user.name}} {{user.surname}}</p>
    </div>
  </div>
</template>

<script setup>
  import {computed, defineProps} from "vue";

  const props = defineProps(["user"]);

  const admin = computed(() => {
    return props.user.admin ? "Evet" : "Hayır";
  });
</script>