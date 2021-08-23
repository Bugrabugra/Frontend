<template>
  <QuillEditor :modules="modules" toolbar="full" />
</template>

<script>
  import {ref, defineComponent, computed} from 'vue'
  import {QuillEditor} from '@vueup/vue-quill'
  import BlotFormatter from 'quill-blot-formatter'
  import '@vueup/vue-quill/dist/vue-quill.snow.css'
  import {useStore} from "vuex";

  export default defineComponent({
    components: {
      QuillEditor,
    },
    props: ["blogHTML"],
    setup() {
      // Store
      const store = useStore();

      // References
      const modules = ref({
        name: 'blotFormatter',
        module: BlotFormatter,
        options: {/* options */}
      });

      // Computed
      const blogHTML = computed({
        get() {
          return store.state.blogHTML;
        },
        set(payload) {
          store.commit("updateBlogHTML", payload);
        }
      });

      return {modules, blogHTML}
    },
  })
</script>
