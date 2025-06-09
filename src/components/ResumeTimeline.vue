<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <!--Eigene Projekte-->
        <h3 class="text-h5 mb-3" :style="{ color: 'var(--heading-color)' }">
          <v-icon start color="primary"> mdi-briefcase-outline </v-icon>
          {{ content.projectsTitle }}
        </h3>
        <v-timeline
          align="start"
          side="end"
          density="compact"
          class="mb-6 timeline-condensed"
        >
          <v-timeline-item
            v-for="item in content.projects"
            :key="'work-' + item.id"
            dot-color="primary"
            size="x-small"
            fill-dot
            class="pb-0"
          >
            <template #opposite>
              <span
                class="text-caption font-weight-medium pt-1 d-block"
                :style="{ color: 'var(--body-color)' }"
                v-text="formatPeriod(item.periode)"
              />
            </template>
            <v-card elevation="0" class="timeline-card pa-1" variant="flat">
              <v-card-title class="text-body-1 font-weight-bold pa-0">
                {{ item.title }}
              </v-card-title>
              <v-card-subtitle class="text-caption pa-0 pt-1 mb-3">
                <v-icon size="12px" start class="mr-1"> mdi-domain </v-icon>
                {{ item.role }}
              </v-card-subtitle>
              <v-card-text class="pa-0 pt-1 font-weight-bold">
                <p class="pt-1">
                  {{ item.description }}
                </p>
              </v-card-text>
              <v-card-subtitle
                class="text-caption pa-0 pt-1 mb-3 d-flex flex-row"
              >
                <ul class="pl-3 d-flex flex-row">
                  <li
                    v-for="(Item, index) in item.skillsUsed"
                    :key="index"
                    class="text-caption mb-0 mr-2"
                    :style="{ color: 'var(--body-color)' }"
                  >
                    {{ Item }}
                  </li>
                </ul>
              </v-card-subtitle>

              <v-card-text class="pa-0 pt-1">
                <a
                  :href="item.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-caption"
                >
                  {{ item.link }}
                </a>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>

        <!--Ausbildungs Bereich-->
        <h3 class="text-h5 mb-3" :style="{ color: 'var(--heading-color)' }">
          <v-icon start color="primary"> mdi-school-outline </v-icon>
          {{ content.educationTitle }}
        </h3>
        <v-timeline
          align="start"
          side="end"
          density="compact"
          class="mb-6 timeline-condensed "
        >
          <v-timeline-item
            v-for="item in content.education"
            :key="'edu-' + item.id"
            dot-color="primary"
            size="x-small"
            fill-dot
            class="pb-0"
          >
            <template #opposite>
              <span
                class="text-caption font-weight-medium pt-1 d-block"
                :style="{ color: 'var(--body-color)' }"
                v-text="formatPeriod(item.period)"
              />
            </template>
            <v-card elevation="0" class="timeline-card pa-1" variant="flat">
              <v-card-title class="text-body-1 font-weight-bold pa-0">
                {{ item.title }}
              </v-card-title>
              <v-card-subtitle class="text-caption pa-0 pt-1 mb-3">
                <v-icon size="12px" start class="mr-1"> mdi-domain </v-icon>
                {{ item.company }}
                <span v-if="item.location" class="ml-1">
                  <v-icon size="12px" start class="mr-1"
                  >mdi-map-marker-outline</v-icon
                  >{{ item.location }}
                </span>
              </v-card-subtitle>
              <v-card-text class="pa-0 pt-1 font-weight-bold">
                <p class="pt-1">
                  {{ item.description }}
                </p>
              </v-card-text>
              <v-card-text class="pa-0 pt-1 me-2">
                <ul class="pl-3 pt-1 d-flex flex-row">
                  <li
                    v-for="(Item, index) in item.skillsUsed"
                    :key="index"
                    class="text-caption mb-0 mr-2"
                    :style="{ color: 'var(--body-color)' }"
                  >
                    {{ Item }}
                  </li>
                </ul>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>

        <!--Kenntnisse -->
        <div>
          <h3
            class="text-h5 mb-3 mt-3"
            :style="{ color: 'var(--heading-color)' }"
          >
            <v-icon start color="primary"> mdi-star-cog-outline </v-icon>
            {{ content.skillsTitle }}
          </h3>

          <v-timeline
            align="start"
            side="end"
            density="compact"
            class="mb-6 timeline-condensed"
          >
            <v-timeline-item
              dot-color="primary"
              size="x-small"
              fill-dot
              class="pb-0"
            >
              <v-card elevation="0" class="timeline-card pa-1" variant="flat">
                <v-card-title class="text-body-1 font-weight-bold pa-0">
                  {{ content.softSkillsTitle }}
                </v-card-title>
                <v-card-text class="pa-0 pt-1">
                  <ul class="pl-3 pt-1">
                    <li
                      v-for="(skill, index) in content.softSkills"
                      :key="'soft-' + index"
                      class="text-caption mb-0 mr-2"
                      :style="{ color: 'var(--body-color)' }"
                    >
                      {{ skill }}
                    </li>
                  </ul>
                </v-card-text>
              </v-card>
            </v-timeline-item>

            <v-timeline-item
              dot-color="primary"
              size="x-small"
              fill-dot
              class="pb-0"
            >
              <v-card elevation="0" class="timeline-card pa-1" variant="flat">
                <v-card-title class="text-body-1 font-weight-bold pa-0">
                  {{ content.hardSkillsTitle }}
                </v-card-title>
                <v-card-text class="pa-0 pt-1">
                  <ul class="pl-3 pt-1">
                    <li
                      v-for="skill in content.hardSkills"
                      :key="'hard-' + skill.name"
                      class="text-caption mb-0 mr-2"
                      :style="{ color: 'var(--body-color)' }"
                    >
                      <v-icon
                        v-if="skill.icon"
                        class="ml-1"
                        :icon="skill.icon"
                        size="small"
                      />
                      {{ skill.name }}
                    </li>
                  </ul>
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </div>
      <!--Kentnisse-->
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { computed, inject, ref, Ref } from "vue";
import resumeData from "@/data/resumeData.json";

// Sprachabhängigkeit
const currentLanguage = inject<Ref<"DE" | "EN">>("currentLanguage", ref("DE"));
const content = computed(() => resumeData[currentLanguage.value]);

// Funktion zum Ersetzen von "Present" oder "Heute"
const formatPeriod = (period: string) => {
  if (!period) return "";
  if (period.includes("Present") || period.includes("Heute")) {
    return period
      .replace("Present", content.value.present)
      .replace("Heute", content.value.present);
  }
  return period;
};
</script>

<style scoped lang="scss">
/* --------------------------------------------
   Allgemeine Timeline-Einstellungen
---------------------------------------------*/
.timeline-condensed {
  overflow-x: hidden;
  width: 100%;
  ::v-deep(.v-timeline-item__body) {
    padding-block-start: 0;
    padding-block-end: 4px;
    padding-inline-start: 8px;
    padding-inline-end: 0;
  }
  ::v-deep(.v-timeline-item__opposite) {
    padding-inline-end: 8px;
  }
  ::v-deep(.v-timeline-divider__dot) {
    margin-block-start: 4px;
  }
}

/* --------------------------------------------
   Card-Layout begrenzen
---------------------------------------------*/
.timeline-card {
  box-sizing: border-box;
  max-width: 100%;
  background-color: transparent !important;
  border-left: 2px solid rgba(var(--v-theme-primary-rgb), 0.6) !important;
  margin: 0;
  padding: 4px 8px !important;
}

/* internes Padding entfernen */
.v-card > .v-card-title,
.v-card > .v-card-subtitle,
.v-card > .v-card-text {
  padding: 0 !important;
  line-height: 1.3 !important;
}

/* Überschriften & Textblöcke umbrechen */
::v-deep .v-card-title,
::v-deep .v-card-subtitle,
::v-deep .v-card-text {
  white-space: normal !important;
  word-break: break-word !important;
  overflow-wrap: anywhere !important;
}

/* --------------------------------------------
   Listen (Skills & Description) als Flex-Wrap
---------------------------------------------*/
.timeline-card ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0.5rem 0;
  padding: 0;
}

/* Abstand der Listeneinträge */
.timeline-card ul li {
  margin: 0.2rem;
}

/* --------------------------------------------
   Eigene Klasse: Verhindert Wortbruch in Skills
   => bitte jedes <li> in deinen Skill-Listen
      um class="skill-item" ergänzen!
---------------------------------------------*/
.skill-item {
  white-space: nowrap !important;
  overflow-wrap: normal !important;
  word-break: normal !important;
}

/* --------------------------------------------
   Timeline passt Höhe ans Material an
---------------------------------------------*/
.v-timeline--vertical.v-timeline {
  height: auto !important;
}
</style>

