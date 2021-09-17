<template>
  <div class="border border-gray-400 bg-gray-100 flex justify-start items-center rounded">
    <!--tag list-->
    <div v-for="(tag, index) in tagList" :key="index">
      <!--tag-->
      <div class="border border-gray-400 bg-gradient-to-b from-gray-100 to-gray-300 px-1 mx-1 my-1 inline-flex items-center rounded">
        {{tag}}
        <button class="ml-1" @click="removeTag(index)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!--input-->
    <span class="flex-1 px-1">
      <input
          type="text"
          placeholder="Enter tag"
          class="outline-none px-2 w-full"
          @keydown.enter="addTag"
          v-model="stringTag"
      >
    </span>
  </div>
</template>

<script>
  import {ref} from "vue";


  export default {
    name: "TagList",
    setup(_, {emit}) {
      // references
      const stringTag = ref("");
      const tagList = ref([]);

      // methods
      const addTag = () => {
        tagList.value.push(stringTag.value);
        stringTag.value = "";
        emit("tagListChanged", tagList.value);
      };

      const removeTag = (index) => {
        tagList.value = tagList.value.filter(tag => {
          return tag !== tagList.value[index];
        });
        emit("tagListChanged", tagList.value);
      };

      return {stringTag, addTag, tagList, removeTag}
    }
  }
</script>