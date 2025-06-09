<template>
  <v-app :theme="store.themeMode" :style="appStyles">
    <Navigation />
    <v-main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { computed, provide } from 'vue'
import Navigation from '@/components/Navigation.vue'
import { useGlobalSettingsStore } from '@/store/globalSettings'

const store = useGlobalSettingsStore()

const currentLanguage = computed(() => store.currentLanguage)

provide('currentLanguage', currentLanguage)

const appStyles = computed(() => ({
  fontFamily: store.themeSettings.fontFamily,
  backgroundColor: store.themeSettings.backgroundColor,
  color: store.themeSettings.bodyColor,
}))
</script>

<style lang="scss">




.v-btn {
  
  
  background-color: var(
    --button-color,
    rgb(var(--v-theme-primary))
  ) !important; 
  color: var(--button-text-color, #ffffff) !important; 
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  
  &:hover {
  }
}


.v-btn--variant-outlined {
  background-color: transparent !important;
  color: var(--button-color, rgb(var(--v-theme-primary))) !important;
  border-color: var(
    --button-color,
    rgb(var(--v-theme-primary))
  ) !important;
}

.v-btn--variant-text {
  background-color: transparent !important;
  color: var(--button-color, rgb(var(--v-theme-primary))) !important;
}


.v-main {
  background-color: var(--background-color) !important;
  transition: background-color 0.3s ease;
  padding-top: 64px; 
}

.v-main-with-bottom-nav {
  padding-bottom: 56px; 
}


.themed-container,
.v-card {
  background-color: var(--container-color) !important; 
  color: var(--body-color) !important;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}
</style>
