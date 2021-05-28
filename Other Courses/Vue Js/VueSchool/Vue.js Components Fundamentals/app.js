let PlanComponent = {
  template: "#plan-template",
  props: {
    name: {
      type: String,
      required: true
    },
    selectedPlan: {
      type: String
    }
  },
  computed: {
    isSelected() {
      return this.name === this.selectedPlan;
    }
  },
  methods: {
    select() {
      this.$emit("eventSelect", this.name)
      this.selected = true;
    }
  }
}

let PlanPicker = {
  components: {
    plan: PlanComponent
  },
  template: "#plan-picker-template",
  data() {
    return {
      plans: ["The Single", "The Curious", "The Addict"],
      selectedPlan: null
    }
  },
  methods: {
    selectPlan(plan) {
      this.selectedPlan = plan;
    }
  }
}

Vue.component("todo-item", {
  template: "#todo-item-template",
  data() {
    return {
      completed: false
    }
  }
})


new Vue({
  el: "#app",
  components: {
    "plan-picker": PlanPicker
  }
})