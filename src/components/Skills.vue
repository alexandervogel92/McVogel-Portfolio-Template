<template>
  <v-container class="py-10 mb-12">
    <v-row justify="center" class="mt-6 skills-section">
      <v-col cols="12" md="10" lg="8">
        <h3 class="text-h5 mb-4 text-center" :style="{ color: 'var(--heading-color)' }">
          <v-icon start color="accent">mdi-star-cog-outline</v-icon>
          {{ content.skillsTitle }}
        </h3>
        <!-- Wrapper, um die Hover-Effekte über beide Karten anwenden zu können -->
        <div class="skills-wrapper">
          <v-row>
            <!-- Hard Skills Card -->
            <v-col cols="12" md="6" class="skill-card-wrapper mb-4 mb-md-0">
              <v-card class="pa-3 fill-height" elevation="1">
                <v-card-title class="text-subtitle-1 font-weight-bold justify-center mb-2">
                  {{ content.hardSkillsTitle }}
                </v-card-title>
                <v-card-text class="text-center pa-1">
                  <v-chip
                    v-for="skill in content.hardSkills"
                    :key="skill.name"
                    class="ma-1"
                    color="primary"
                    label
                    size="small"
                    variant="flat"
                  >
                    <v-icon
                      v-if="skill.icon"
                      start
                      :icon="skill.icon"
                      size="x-small"
                    ></v-icon>
                    {{ skill.name }}
                  </v-chip>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Soft Skills Card -->
            <v-col cols="12" md="6" class="skill-card-wrapper">
              <v-card class="pa-3 fill-height" elevation="1">
                <v-card-title class="text-subtitle-1 font-weight-bold justify-center mb-2">
                  {{ content.softSkillsTitle }}
                </v-card-title>
                <v-card-text class="text-center pa-1">
                  <v-chip
                    v-for="skill in content.softSkills"
                    :key="skill"
                    class="ma-1"
                    color="secondary"
                    label
                    size="small"
                    variant="tonal"
                  >
                    {{ skill }}
                  </v-chip>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { computed, inject, ref, Ref } from 'vue';
import resumeData from '@/data/resumeData.json';

// Hole die globale Sprache (Default: 'DE')
const currentLanguage = inject<Ref<'DE' | 'EN'>>('currentLanguage', ref('DE'));
const content = computed(() => resumeData[currentLanguage.value]);
</script>

<style scoped lang="scss">
/* Standard-Regeln für die Skill-Karten */
.skills-section .v-card {
  background-color: var(--container-color);
}
.skills-section .v-card-title {
  color: var(--heading-color);
  font-size: 1rem;
}
.skills-section .v-chip {
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
}

/* Wrapper für die Hover-Effekte */
.skills-wrapper {
  display: block;
}

/* Jede Skill-Karte erhält diese Klasse */
.skill-card-wrapper {
  transition: filter 0.3s ease;
}

/* Wenn über den Wrapper gehovt wird, werden alle Karten, die nicht direkt gehovt werden, geblurt */
.skills-wrapper:hover .skill-card-wrapper:not(:hover) {
  filter: blur(4px);
}
</style>
