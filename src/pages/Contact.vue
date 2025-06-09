<template>
  <v-container class="py-10">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card elevation="5" class="pa-5 pa-md-10">
          <v-card-title class="text-h4 text-center mb-6">
            <v-icon start size="large" color="primary">mdi-email-fast-outline</v-icon>
            {{ pageTitle }}
          </v-card-title>
          <v-card-subtitle class="text-center mb-8">
            {{ pageSubtitle }}
          </v-card-subtitle>

          <ContactForm />

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed, inject } from 'vue';
import ContactForm from '@/components/ContactForm.vue';

// Sprachabhängigkeit
const currentLanguage = inject<Ref<'DE' | 'EN'>>('currentLanguage', ref('DE'));

const pageTitle = computed(() => currentLanguage.value === 'DE' ? 'Kontakt aufnehmen' : 'Get in Touch');
const pageSubtitle = computed(() => currentLanguage.value === 'DE' ? 'Ich freue mich darauf, von Ihnen zu hören!' : 'I look forward to hearing from you!');

</script>

<style scoped lang="scss">
.v-card {
  background-color: var(--container-color); /* Nutze Theme-Farbe */
}
.v-card-title, .v-card-subtitle {
  color: var(--heading-color); /* Nutze Theme-Farbe */
}
</style>
