<template>
  <v-carousel
    height="400"
    show-arrows="hover"
    cycle
    hide-delimiter-background
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
    >
      <v-sheet
        :color="colors"
        height="100%"
        class="rounded-corners"
      >
        <div class="d-flex fill-height justify-center align-center">
          <div class="text-center p-4 text-white">
            <div class="text-body-1" style="max-width: 600px; margin: 0 auto;">
              {{ slide }}
            </div>
          </div>
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import carouselData from '@/data/carouselData.json';
import {inject, watch, ref} from "vue";
export default {
  data() {
    const currentLanguage = inject("currentLanguage");
    const slides = ref([]);
    const colors = ref([]);

    // Initialisierung der Werte bei Sprachwechsel
    const updateData = (language) => {
      const upperCaseLanguage = language.toUpperCase();
      slides.value = carouselData[upperCaseLanguage]?.slides || [];
      colors.value = carouselData[upperCaseLanguage]?.colors || [];
    };

    // Initiale Daten laden
    updateData(currentLanguage.value);

    // Watcher hinzufügen, um auf Änderungen von currentLanguage zu reagieren
    watch(
      () => currentLanguage.value, // Beobachtungsziel
      (newValue) => {
        updateData(newValue); // Update mit neuer Sprache
      },
      { immediate: true } // Sofortige Ausführung beim ersten Laden
    );

    return {
      colors,
      slides,
    };
  },
}
</script>
<style scoped lang="scss">
.v-carousel-item {
  .rounded-corners {
    border-radius: 16px;  /* Hier runden wir die Ecken ab */
  }
  .text-body-1 {
    font-size: x-large !important;
    line-height: 1.5;
    color: #ffffff; /* Weißer Text für bessere Lesbarkeit */
  }

  .p-4 {
    padding: 20px; /* Genügend Abstand um den Text */
  }
}
</style>
