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

    const updateData = (language) => {
      const upperCaseLanguage = language.toUpperCase();
      slides.value = carouselData[upperCaseLanguage]?.slides || [];
      colors.value = carouselData[upperCaseLanguage]?.colors || [];
    };

    updateData(currentLanguage.value);

    watch(
      () => currentLanguage.value,
      (newValue) => {
        updateData(newValue);
      },
      { immediate: true }
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
    border-radius: 16px;  
  }
  .text-body-1 {
    font-size: x-large !important;
    line-height: 1.5;
    color: #ffffff; 
  }

  .p-4 {
    padding: 20px; 
  }
}
</style>
