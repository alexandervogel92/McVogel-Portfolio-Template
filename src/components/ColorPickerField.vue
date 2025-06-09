<template>
  <v-menu
      v-model="menu"
      :close-on-content-click="false"
      max-width="320"
  >
    <template #activator="{ props }">
      <div class="activator-wrapper">
        <v-btn
            v-bind="props"
            class="color-btn"
            :style="`background-color: ${color} !important;`"
            elevation="0"
            size="small"
        ></v-btn>
        <span class="hex-text">{{ color }}</span>
      </div>
    </template>

    <v-color-picker
        v-model="color"
        hide-mode-switch
        hide-inputs
        show-swatches
        elevation="0"
    />
  </v-menu>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

const menu = ref(false);

const color = computed<string>({
  get: () => props.modelValue || '#ffffff',
  set: (val: string) => emit('update:modelValue', val),
});
</script>

<style scoped>
.activator-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-btn {
  width: 32px;
  height: 32px;
  min-width: 32px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0;
}

.hex-text {
  font-size: 0.75rem;
  color: #333;
}
</style>
