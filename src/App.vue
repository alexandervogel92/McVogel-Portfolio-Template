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
import { computed, provide } from 'vue' // Importiere 'provide'
import Navigation from '@/components/Navigation.vue'
import { useGlobalSettingsStore } from '@/store/globalSettings'

const store = useGlobalSettingsStore()

// Rufe den currentLanguage-Ref aus dem Store ab
const currentLanguage = computed(() => store.currentLanguage)

// Stelle den currentLanguage-Ref für Kindkomponenten bereit
provide('currentLanguage', currentLanguage)

// Berechne die Styles basierend auf dem Store
// Dies stellt sicher, dass die App reaktiv auf Style-Änderungen reagiert
const appStyles = computed(() => ({
  fontFamily: store.themeSettings.fontFamily,
  backgroundColor: store.themeSettings.backgroundColor,
  color: store.themeSettings.bodyColor,
}))
</script>

<style lang="scss">
/* Globale Stile */

// ... (bestehende globale Stile wie fade transition, :root, body, headings, scrollbar) ...

/* Globale Button Stile */
.v-btn {
  /* Wende die benutzerdefinierten Farben an, wenn sie gesetzt sind */
  /* Wir verwenden :deep() oder eine globale Klasse, falls nötig */
  background-color: var(
    --button-color,
    rgb(var(--v-theme-primary))
  ) !important; /* Fallback auf Theme Primary */
  color: var(--button-text-color, #ffffff) !important; /* Fallback auf Weiß */
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  /* Beispiel: Dunklerer Button beim Hover */
  &:hover {
    // Das ist schwierig global zu steuern, da Vuetify eigene Hover-Styles hat.
    // Man könnte Filter oder spezifischere Selektoren verwenden.
    // filter: brightness(90%); // Einfacher Ansatz
  }
}

/* Spezifischere Anpassungen für Outline/Text Buttons, falls gewünscht */
.v-btn--variant-outlined {
  background-color: transparent !important; // Outline hat keinen Hintergrund
  color: var(--button-color, rgb(var(--v-theme-primary))) !important; // Textfarbe ist Button-Farbe
  border-color: var(
    --button-color,
    rgb(var(--v-theme-primary))
  ) !important; // Randfarbe ist Button-Farbe
}

.v-btn--variant-text {
  background-color: transparent !important; // Text hat keinen Hintergrund
  color: var(--button-color, rgb(var(--v-theme-primary))) !important; // Textfarbe ist Button-Farbe
}

/* Überschreibt ggf. Vuetify Standard-Hintergrund auf v-main */
.v-main {
  background-color: var(--background-color) !important;
  transition: background-color 0.3s ease;
  padding-top: 64px; /* Standardhöhe der App-Bar */
}
/* Anpassung für Bottom Navigation */
.v-main-with-bottom-nav {
  padding-bottom: 56px; /* Standardhöhe der Bottom Navigation */
}

/* Stil für Container oder Karten, um containerColor zu nutzen */
.themed-container,
.v-card {
  background-color: var(--container-color) !important; /* !important kann bei Vuetify nötig sein */
  color: var(--body-color) !important;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}
</style>
