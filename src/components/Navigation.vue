<template>
  <div>
    <v-app-bar
      app
      :style="{ backgroundColor: 'var(--container-color, #0d1117)' }"
      elevation="3"
      class="nav-wrapper top-nav"
      :class="{ hidden: !showTopNav }"
      v-if="display.mdAndUp.value"
    >
      <v-tabs
        v-model="activeTab"
        align-tabs="center"
        color="primary"
        height="60"
        slider-color="primary"
        class="tabs"
        style="flex-grow: 1;"
      >
        <v-tab
          v-for="tab in tabs"
          :key="tab.value"
          :value="tab.path"
          @click="navigateToTab(tab.path)"
        >
          <v-icon start :icon="tab.icon"></v-icon>
          {{ tab.text }}
        </v-tab>
      </v-tabs>

      <v-spacer></v-spacer>

      <v-btn icon @click="settingsDialog = true" class="mr-2">
        <v-tooltip activator="parent" location="bottom">{{ currentLanguage === 'DE' ? 'Einstellungen' : 'Settings' }}</v-tooltip>
        <v-icon color="primary">mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>

    <v-bottom-navigation
      v-model="activeTab"
      v-if="display.smAndDown.value"
      color="primary"
      grow
      app
      class="bottom-nav"
      :style="{ backgroundColor: 'var(--container-color, #0d1117)' }"
    >
      <v-btn
        v-for="tab in mobileTabs"
        :key="'bottom-' + tab.value"
        :value="tab.path"
        @click="navigateToTab(tab.path)"
      >
        <v-icon :icon="tab.icon"></v-icon>
        <span>{{ tab.text }}</span>
      </v-btn>

      <v-btn @click="settingsDialog = true">
        <v-icon>mdi-cog</v-icon>
        <span>{{ currentLanguage === 'DE' ? 'Setup' : 'Setup' }}</span>
      </v-btn>
    </v-bottom-navigation>

    <SettingsDialog v-model="settingsDialog" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useDisplay } from 'vuetify';
import SettingsDialog from './SettingsDialog.vue'; // Importiere den Dialog
import { useGlobalSettingsStore } from '@/store/globalSettings'; // Importiere den Store für die Sprache

const store = useGlobalSettingsStore();
// currentLanguage ist ein Ref aus dem Pinia-Store.
// Kein computed nötig, damit in der Template der Wert korrekt aufgelöst wird.
const currentLanguage = store.currentLanguage;

const router = useRouter();
const route = useRoute();
const display = useDisplay(); // Vuetify's Hook für Breakpoints

const settingsDialog = ref(false); // Zustand für den Einstellungsdialog
const activeTab = ref(route.path);

// Beobachte die Route, um den aktiven Tab zu aktualisieren
watch(() => route.path, (newPath) => {
  activeTab.value = newPath;
});

// Filtert Routen, die in den Tabs angezeigt werden sollen
const tabs = computed(() => {
  return router.getRoutes()
    .filter((r) => r.meta?.showInTabs)
    .map((r) => ({
      path: r.path,
      // @ts-ignore // Sicherstellen, dass 'name' existiert oder Fallback
      text: r.name || 'Unnamed',
      // @ts-ignore // Sicherstellen, dass 'icon' existiert oder Fallback
      icon: r.meta?.icon || 'mdi-help-circle',
      value: r.path,
    }));
});

// Definiere, welche Tabs auf Mobilgeräten angezeigt werden (kann dieselbe Liste sein oder eine Teilmenge)
const mobileTabs = computed(() => {
  // Beispiel: Zeige nur die ersten 3 Tabs + Einstellungen im Bottom Nav
  // return tabs.value.slice(0, 3);
  return tabs.value; // Zeige alle Tabs
});

const navigateToTab = (path: string) => {
  router.push(path);
};

// --- Scroll-Logik für die obere Navigationsleiste ---
const showTopNav = ref(true);
let previousScroll = 0;

const handleScroll = () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  // Blende nur aus, wenn man signifikant nach unten scrollt und nicht ganz oben ist
  if (currentScroll > previousScroll && currentScroll > 80) {
    showTopNav.value = false;
  } else {
    showTopNav.value = true;
  }
  previousScroll = currentScroll <= 0 ? 0 : currentScroll; // Verhindert negative Werte
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

// Stelle sicher, dass die Navigation sichtbar ist, wenn die Route wechselt
watch(route, () => {
  showTopNav.value = true;
  previousScroll = 0; // Reset scroll position memory
});

</script>

<style scoped lang="scss">
// Obere Navigation
.top-nav {
  transition: transform 0.3s ease-in-out, background-color 0.3s ease;
  will-change: transform;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1005;
  background-color: var(--nav-background-color, #0d1117); /* Stelle sicher, dass es hier angewendet wird */
}

.top-nav.hidden {
  transform: translateY(-100%);
}

.tabs .v-tab {
  transition: color 0.2s ease;
  color: var(--nav-text-color, #BDBDBD); /* NEU: CSS Variable für Text */
}

// Aktiver Tab wird durch 'color="primary"' gesteuert, Textfarbe könnte man auch anpassen:
/*
.tabs .v-tab.v-tab--selected {
  color: rgb(var(--v-theme-primary));
}
*/

// Untere Navigation
.bottom-nav {
  transition: background-color 0.3s ease;
  z-index: 1004;
  background-color: var(--nav-background-color, #0d1117) !important; /* !important kann nötig sein */

  .v-btn {
    color: var(--nav-text-color, #BDBDBD); /* NEU: CSS Variable für Text */
    transition: color 0.2s ease;
    &.v-btn--active {
      color: rgb(var(--v-theme-primary)); // Nutze die Primärfarbe des Themes
    }

    span {
      font-size: 0.7rem;
      margin-top: 2px;
    }
  }
}
</style>
