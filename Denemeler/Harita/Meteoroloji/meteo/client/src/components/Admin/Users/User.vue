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
      <p class="font-semibold">Adı:
        <span class="font-normal">{{user.name}}</span>
      </p>
      <p class="font-semibold">Soyadı:
        <span class="font-normal">{{user.surname}}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
  import {defineProps} from "vue";

  defineProps(["user"]);
</script>