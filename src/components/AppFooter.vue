<template>
  <v-footer class="app-footer" app>
    <v-container class="text-center">
      <span>
        Template by
        <a href="https://github.com/McVogel/McVogel-Portfolio-Template" target="_blank" rel="noopener">McVogel-Portfolio-Template</a>
      </span>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.app-footer {
  background-color: var(--container-color);
  color: var(--nav-text-color, #BDBDBD);
  padding: 16px 0;
  font-size: 0.875rem;
}
.app-footer a {
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
}
</style>
