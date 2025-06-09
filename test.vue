<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        md="10"
        lg="8"
      >
        <!--Eigene Projekte-->
        <h3
          class="text-h5 mb-3"
          :style="{ color: 'var(--heading-color)' }"
        >
          <v-icon
            start
            color="primary"
          >
            mdi-briefcase-outline
          </v-icon>
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
            <v-card
              elevation="0"
              class="timeline-card pa-1"
              variant="flat"
            >
              <v-card-title class="text-body-1 font-weight-bold pa-0">
                {{ item.title }}
              </v-card-title>
              <v-card-subtitle class="text-caption pa-0 pt-1 mb-3">
                <v-icon
                  size="12px"
                  start
                  class="mr-1"
                >
                  mdi-domain
                </v-icon>
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
        <h3
          class="text-h5 mb-3 mt-3"
          :style="{ color: 'var(--heading-color)' }"
        >
          <v-icon
            start
            color="primary"
          >
            mdi-school-outline
          </v-icon>
          {{ content.educationTitle }}
        </h3>
        <v-timeline
          align="start"
          side="end"
          density="compact"
          class="mb-6 timeline-condensed"
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
            <v-card
              elevation="0"
              class="timeline-card pa-1"
              variant="flat"
            >
              <v-card-title class="text-body-1 font-weight-bold pa-0">
                {{ item.title }}
              </v-card-title>
              <v-card-subtitle class="text-caption pa-0 pt-1">
                <v-icon
                  size="12px"
                  start
                  class="mr-1"
                >
                  mdi-domain
                </v-icon>{{ item.company }}
                <span
                  v-if="item.location"
                  class="ml-1"
                >
                  <v-icon
                    size="12px"
                    start
                    class="mr-1"
                  >mdi-map-marker-outline</v-icon>{{ item.location }}
                </span>
              </v-card-subtitle>
              <v-card-text class="pa-0 pt-1">
                <ul class="pl-3 pt-1">
                  <li
                    v-for="(descItem, index) in item.description"
                    :key="index"
                    class="text-caption mb-0"
                    :style="{ color: 'var(--body-color)' }"
                  >
                    {{ descItem }}
                  </li>
                </ul>
              </v-card-text>
              <v-card-text class="pa-0 pt-1">
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

        <div>
          <h3
            class="text-h5 mb-3 mt-3"
            :style="{ color: 'var(--heading-color)' }"
          >
            <v-icon
              start
              color="primary"
            >
              mdi-star-cog-outline
            </v-icon>
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
              <v-card
                elevation="0"
                class="timeline-card pa-1"
                variant="flat"
              >
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
              <v-card
                elevation="0"
                class="timeline-card pa-1"
                variant="flat"
              >
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
// Timeline kompakter machen - aggressivere Styles
.timeline-condensed {
  :deep(.v-timeline-item__body) {
    padding-block-start: 0; // Vertikales Padding im Body entfernen
    padding-block-end: 4px; // Nur kleiner Abstand unten im Body
    padding-inline-start: 8px; // Abstand links vom Body zur Linie
    padding-inline-end: 0;
  }
  :deep(.v-timeline-item__opposite) {
    padding-inline-end: 8px; // Kleiner Abstand rechts vom "Opposite"-Slot
  }
  :deep(.v-timeline-divider__dot) {
    margin-block-start: 4px; // Kleiner Abstand über dem Punkt
  }
}

.timeline-card {
  // Flacher Stil ohne Hintergrund, nur Akzentlinie
  background-color: transparent !important;
  border-left: 2px solid rgb(var(--v-theme-primary) / 0.6); // Dünnere, halbtransparente Linie
  margin: 0;
  padding: 4px 8px !important; // Minimales Padding
}
// Überschreibe ggf. interne Card-Padding/Margin-Klassen, falls pa-1 nicht reicht
.v-card > .v-card-title,
.v-card > .v-card-subtitle,
.v-card > .v-card-text {
  padding: 0; // Entferne internes Padding
  line-height: 1.3; // Kompakte Zeilenhöhe
}
.v-card > .v-card-subtitle {
  padding-top: 2px !important; // Kleiner Abstand nach Titel
}
.v-card > .v-card-text {
  padding-top: 4px !important; // Kleiner Abstand nach Subtitel
}

ul {
  list-style-type: none; // Keine Aufzählungszeichen
  padding-left: 0px !important;
  margin: 0;
  li {
    line-height: 1.3;
    font-size: 0.78rem; // Sehr kleine Schrift
    padding-bottom: 2px; // Minimaler Abstand zwischen list items
  }
}
.border {
  border: 2px solid red !important;
}
// Skills Karten Stile
.skills-section {
  // DEBUG: Füge einen auffälligen Rahmen hinzu, um Überlappung zu visualisieren
  border: 2px solid red;
  //position: relative; // Setze einen Positionierungs-Kontext
  // Versuche, es nach vorne zu bringen (nur zum Testen)

  /* Prüfe in den DevTools die Elemente mit den Klassen:
     - .skills-section (diese v-row)
     - die v-timeline für "Ausbildung" direkt darüber
     - deren Elternelement(e) (v-col, v-row, v-container in Home.vue)
     Achte auf CSS-Eigenschaften wie:
     - position (static, relative, absolute, fixed, sticky)
     - z-index
     - margin (besonders negative Werte)
     - transform (kann Elemente verschieben)
     - height / max-height (könnte Inhalt abschneiden/überlappen lassen)
  */
}

.skills-section .v-card {
  background-color: var(--container-color);
}
.skills-section .v-card-title {
  color: var(--heading-color);
  font-size: 1rem; // Kleinere Titel für Skill-Karten
}
.skills-section .v-chip {
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
}
.v-timeline--vertical.v-timeline {
  height: auto; /* Lässt die Höhe sich am Inhalt orientieren */
}
</style>
