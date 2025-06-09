<template>
  <h1 :class="['typing-effect', { 'no-cursor': completed }]">{{ displayText }}</h1>
</template>

<script lang="ts">
export default {
  name: "TypingEffect",
  props: {
    text: {
      type: String,
      required: true,
    },
    replacement: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      displayText: "",
      index: 0,
      deleting: false,
      completed: false,
    };
  },
  mounted() {
      setTimeout(() => {
        this.type();
      }, 1700);
  },
  methods: {
    type() {
      const typingSpeed = 200;
      const deletingSpeed = 150;
      const pauseSpeed = 500;

      if (this.completed) return;

      if (!this.deleting) {
        if (this.index < this.text.length) {
          this.displayText = this.text.slice(0, this.index + 1);
          this.index++;
          setTimeout(this.type, typingSpeed);
        } else {
          this.deleting = true;
          setTimeout(this.type, pauseSpeed);
        }
      } else {
        if (this.index > this.text.length - 3) {
          this.index--;
          this.displayText = this.text.slice(0, this.index);
          setTimeout(this.type, deletingSpeed);
        } else {
          this.displayText = this.text.slice(0, -3) + this.replacement;
        }
      }
    },
  },
};
</script>

<style scoped>
.typing-effect {
  font-family: 'Courier New', monospace;
  font-size: 1em;
  border-right: 4px solid;
  padding-right: 5px;
  display: inline-block;
  animation: blink 0.75s step-end infinite;
}
.no-cursor {
  border-right: none;
  animation: none;
}
@keyframes blink {
  50% {
    border-color: transparent;
  }
}
</style>
