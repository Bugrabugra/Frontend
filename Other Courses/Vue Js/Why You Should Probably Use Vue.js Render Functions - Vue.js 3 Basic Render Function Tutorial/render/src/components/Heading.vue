<script>
  import {h} from "vue";


  export default {
    props: {
      level: {
        default: 1
      }
    },
    setup(props, context) {
      const slot = context.slots.default ? context.slots.default() : [];
      const modifiedSlot = slot.map(({children}) => {
        return h("div", {style: "color: purple"}, children);
      })
      return () => h(`h${props.level}`, modifiedSlot);
    }
  }
</script>

<style scoped>

</style>