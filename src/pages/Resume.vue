<template>
  <v-container class="py-10 mb-12">
    <h1 class="text-h3 text-center mb-12" :style="{ color: 'var(--heading-color)' }">
      {{ pageTitle }}
    </h1>
    <ResumeTimeline />
  </v-container>
</template>

<script lang="ts" setup>
import { computed, inject, ref, Ref } from 'vue';
import ResumeTimeline from '@/components/ResumeTimeline.vue';

const currentLanguage = inject<Ref<'DE' | 'EN'>>('currentLanguage', ref('DE'));
const pageTitle = computed(() => currentLanguage.value.toUpperCase() === 'DE' ? 'Lebenslauf' : 'Resume');

</script>

<style scoped lang="scss">


</style>
