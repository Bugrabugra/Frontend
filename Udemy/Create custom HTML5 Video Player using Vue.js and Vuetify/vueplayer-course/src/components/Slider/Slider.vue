<template>
  <div :class="classes" @mousedown="onSliderMouseDown" @click="onSliderClick">
    <div class="slider__bar" ref="bar">
      <div class="slider__handle" :style="handleStyle" ref="handle"/>
      <div class="slider__fill" :style="fillStyle"/>
    </div>
  </div>
</template>

<script>
  import "./Slider.scss";
  import throttle from "lodash/throttle";
  import {getRelativeXPosition} from "../../utils/helpers";
  const lerp = require("lerp");


  export default {
    name: "Slider",
    data() {
      return {
        isDragging: false,
        handleWidth: 0,
        barWidth: 0,
        dragTimeout: null
      }
    },

    props: {
      min: {
        type: Number,
        default: 0
      },

      max: {
        type: Number,
        default: 1
      },

      value: Number,

      disabled: Boolean
    },

    computed: {
      classes() {
        return {
          slider: true,
          "slider--dragging": this.isDragging,
          "slider--disabled": this.disabled
        }
      },

      delta() {
        return this.value / this.max;
      },

      fillStyle() {
        return {
          transformOrigin: "left center",
          transform: `scaleX(${this.delta})`
        }
      },

      handleStyle() {
        const {barWidth, delta, handleWidth} = this;

        return {
          transform: `translateX(${barWidth * delta - (handleWidth * 0.5)}px)`
        }
      }
    },

    methods: {
      calcDimensions() {
        const {bar, handle} = this.$refs;

        this.handleWidth = handle.offsetWidth;
        this.barWidth = bar.offsetWidth;
      },

      onDocumentMouseMove(e) {
        if (this.disabled || !this.isDragging) return;
        this.calculate(e);
      },

      onSliderMouseDown() {
        if (this.disabled) return;

        this.dragTimeout = setTimeout(() => {
          this.isDragging = true;
          this.dragTimeout = null;
          this.$emit("dragstart");
        }, 100)
      },

      onDocumentMouseUp() {
        if (this.disabled) return;
        if (this.dragTimeout) {
          clearTimeout(this.dragTimeout);
          this.$emit("click");
        } else {
          this.isDragging = false;
          this.$emit("dragend");
        }
      },

      onSliderClick(e) {
        if (this.disabled) return;
        this.calculate(e);
      },

      onWindowResize() {
        this.calcDimensions();
      },

      calculate(e) {
        const {bar} = this.$refs;
        const {barWidth} = this;
        const relativeX = getRelativeXPosition(e, bar);
        const delta = relativeX / barWidth;
        this.$emit("input", lerp(this.min, this.max, delta));
      }
    },

    mounted() {
      this.onWindowResize = throttle(this.onWindowResize, 200);

      this.calcDimensions();

      window.addEventListener("resize", this.onWindowResize);
      document.addEventListener("mouseup", this.onDocumentMouseUp);
      document.addEventListener("mousemove", this.onDocumentMouseMove);
    },

    beforeDestroy() {
      window.removeEventListener("resize", this.onWindowResize);
      document.removeEventListener("mouseup", this.onDocumentMouseUp);
      document.removeEventListener("mousemove", this.onDocumentMouseMove);
    }
  }
</script>