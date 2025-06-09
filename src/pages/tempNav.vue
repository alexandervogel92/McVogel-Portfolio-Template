<template>
  <v-sheet color="#0d1117" elevation="3" rounded="lg">
    <v-tabs
      v-model="activeTab"
      align-tabs="center"
      color="red"
      height="60"
      slider-color="#f78166"
    >
      <v-tab
        v-for="tab in tabs"
        :key="tab.value"
        :value="tab.value"
        :prepend-icon="tab.icon"
        :text="tab.text"
        class="text-none"
      ></v-tab>
    </v-tabs>

    <transition name="slide-fade">
      <router-view />
    </transition>
  </v-sheet>
</template>

<script>
export default {
  data() {
    return {
      activeTab: "",
      tabs: [
        {
          icon: "mdi-home",
          text: "Home",
          value: "home",
          path: "/",
        },
        {
          icon: "mdi-folder",
          text: "Projects",
          value: "projects",
          path: "/projects",
        },
      ],
    };
  },
  created() {
    const matchedTab = this.tabs.find((tab) => tab.path === this.$route.path);
    if (matchedTab) {
      this.activeTab = matchedTab.value;
    }
  },
  watch: {
    $route(to) {
      const matchedTab = this.tabs.find((tab) => tab.path === to.path);
      if (matchedTab) {
        this.activeTab = matchedTab.value;
      }
    },
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


.slide-fade-enter-active, .slide-fade-leave-active {
  transition: transform 0.5s ease-in-out;
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(100%);
}
</style>
