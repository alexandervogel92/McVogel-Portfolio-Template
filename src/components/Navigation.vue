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
import SettingsDialog from './SettingsDialog.vue';
import { useGlobalSettingsStore } from '@/store/globalSettings';

const store = useGlobalSettingsStore();
const currentLanguage = store.currentLanguage;

const router = useRouter();
const route = useRoute();
const display = useDisplay();

const settingsDialog = ref(false);
const activeTab = ref(route.path);

watch(() => route.path, (newPath) => {
  activeTab.value = newPath;
});

const tabs = computed(() => {
  return router.getRoutes()
    .filter((r) => r.meta?.showInTabs)
    .map((r) => ({
      path: r.path,
      text: r.name || 'Unnamed',
      icon: r.meta?.icon || 'mdi-help-circle',
      value: r.path,
    }));
});

const mobileTabs = computed(() => {
  return tabs.value;
});

const navigateToTab = (path: string) => {
  router.push(path);
};

const showTopNav = ref(true);
let previousScroll = 0;

const handleScroll = () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  if (currentScroll > previousScroll && currentScroll > 80) {
    showTopNav.value = false;
  } else {
    showTopNav.value = true;
  }
  previousScroll = currentScroll <= 0 ? 0 : currentScroll;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

watch(route, () => {
  showTopNav.value = true;
  previousScroll = 0;
});

</script>

<style scoped lang="scss">
.top-nav {
  transition: transform 0.3s ease-in-out, background-color 0.3s ease;
  will-change: transform;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1005;
  background-color: var(--nav-background-color, #0d1117); 
}

.top-nav.hidden {
  transform: translateY(-100%);
}

.tabs .v-tab {
  transition: color 0.2s ease;
  color: var(--nav-text-color, #BDBDBD); 
}



.bottom-nav {
  transition: background-color 0.3s ease;
  z-index: 1004;
  background-color: var(--nav-background-color, #0d1117) !important; 

  .v-btn {
    color: var(--nav-text-color, #BDBDBD); 
    transition: color 0.2s ease;
    &.v-btn--active {
      color: rgb(var(--v-theme-primary));
    }

    span {
      font-size: 0.7rem;
      margin-top: 2px;
    }
  }
}
</style>
