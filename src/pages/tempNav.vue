<template>
  <v-sheet color="#0d1117" elevation="3" rounded="lg">
    <v-tabs
      v-model="activeTab"
      align-tabs="center"
      color="red"
      height="60"
      slider-color="#f78166"
    >
      <!-- Dynamische Tabs -->
      <v-tab
        v-for="tab in tabs"
        :key="tab.value"
        :value="tab.value"
        :prepend-icon="tab.icon"
        :text="tab.text"
        class="text-none"
      ></v-tab>
    </v-tabs>

    <!-- Router View mit Slide-Effekt -->
    <transition name="slide-fade">
      <router-view />
    </transition>
  </v-sheet>
</template>

<script>
export default {
  data() {
    return {
      activeTab: "", // Aktiver Tab, initial leer
      tabs: [
        {
          icon: "mdi-home",
          text: "Home",
          value: "home",
          path: "/", // Route für Home
        },
        {
          icon: "mdi-folder",
          text: "Projects",
          value: "projects",
          path: "/projects", // Route für Projekte
        },
      ],
    };
  },
  created() {
    // Aktivieren des richtigen Tabs basierend auf der Route
    const matchedTab = this.tabs.find((tab) => tab.path === this.$route.path);
    if (matchedTab) {
      this.activeTab = matchedTab.value;
    }
  },
  watch: {
    // Synchronisation des aktiven Tabs mit der Route
    $route(to) {
      const matchedTab = this.tabs.find((tab) => tab.path === to.path);
      if (matchedTab) {
        this.activeTab = matchedTab.value;
      }
    },
    // Synchronisierung der Route mit dem aktiven Tab
    activeTab(value) {
      const matchedTab = this.tabs.find((tab) => tab.value === value);
      if (matchedTab) {
        this.$router.push(matchedTab.path);
      }
    },
  },
};
</script>

<style scoped>
.v-tab--active {
  font-weight: bold;
}

/* Übergang für den Slide-Effekt */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: transform 0.5s ease-in-out;
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(100%);
}
</style>
