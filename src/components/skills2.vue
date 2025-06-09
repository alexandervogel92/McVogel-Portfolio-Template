<template>
  <v-container class="py-10 mb-12">
    <v-row justify="center" class="mt-6 skills-section">
      <v-col cols="12" md="10" lg="8">
        <h3
          class="text-h5 mb-4 text-center"
          :style="{ color: 'var(--heading-color)' }"
        >
          <v-icon start color="accent">mdi-star-cog-outline</v-icon>
          {{ content.skillsTitle }}
        </h3>

        <div class="skills-wrapper">
        <v-row>
          <v-col cols="12" md="6" class="skill-card-wrapper mb-4 mb-md-0">
            <v-card class="pa-3 fill-height" elevation="1">
              <v-card-title
                class="text-subtitle-1 font-weight-bold justify-center mb-2"
              >
                {{ content.hardSkillsTitle }}
              </v-card-title>
              <v-card-text class="pa-1">
                <div
                  v-for="(skills, category) in groupedHardSkills"
                  :key="category"
                  class="hard-skill-group"
                >
                  <h4 class="category-title">{{ category }}</h4>
                  <v-chip
                    v-for="skill in skills"
                    :key="skill.name"
                    class="ma-1"
                    color="primary"
                    label
                    size="small"
                    variant="tonal"
                  >
                    <v-icon
                      v-if="skill.icon"
                      start
                      :icon="skill.icon"
                      size="x-small"
                    ></v-icon>
                    {{ skill.name }}
                  </v-chip>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="6" class="skill-card-wrapper">
            <v-card class="pa-3 fill-height" elevation="1">
              <v-card-title
                class="text-subtitle-1 font-weight-bold justify-center mb-2"
              >
                {{ content.softSkillsTitle }}
              </v-card-title>
              <v-card-text class="pa-1">
                <ul class="soft-skill-list">
                  <li v-for="skill in content.softSkills" :key="skill">
                    <v-chip
                      :key="skill"
                      class="ma-1"
                      color="primary"
                      label
                      size="small"
                      variant="tonal"
                    >
                    {{ skill }}
                    </v-chip>
                  </li>
                </ul>
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

const currentLanguage = inject<Ref<'DE' | 'EN'>>('currentLanguage', ref('DE'));
const content = computed(() => resumeData[currentLanguage.value]);

const groupedHardSkills = computed(() => {
  return content.value.hardSkills.reduce((groups, skill) => {
    const category = skill.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(skill);
    return groups;
  }, {} as Record<string, Array<{ name: string; icon: string; category: string }>>);
});
</script>

<style scoped lang="scss">
.skills-section .v-card {
  background-color: var(--container-color);
}

.skills-section .v-card-title {
  color: var(--heading-color);
  font-size: 1rem;
  text-align: center;
}
.skills-section .v-chip {
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
}

.hard-skill-group {
  margin-bottom: 1rem;
  .category-title {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    text-align: left;
    color: var(--heading-color);
  }
}


.soft-skill-list {
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    margin-bottom: 0.5rem;
  }
}
.skills-wrapper {
  display: block;
}


.skill-card-wrapper {
  transition: filter 0.3s ease;
}


.skills-wrapper:hover .skill-card-wrapper:not(:hover) {
  filter: blur(4px);
}
</style>
