<template>
  <v-dialog v-model="internalDialog" max-width="600" scrollable>
    <v-card :style="{ fontFamily: store.themeSettings.fontFamily }">
      <v-card-title class="d-flex justify-space-between align-center">
        <span>{{ store.currentLanguage === 'DE' ? 'Einstellungen' : 'Settings' }}</span>
        <v-btn icon @click="closeDialog" density="compact" variant="text">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-expansion-panels multiple>
          <v-expansion-panel>
            <v-expansion-panel-title class="text-subtitle-1">
              {{ store.currentLanguage === 'DE' ? 'Allgemein' : 'General' }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-container class="pa-0">
                <v-row class="align-center mb-3">
                  <v-col cols="4" class="text-caption">{{ store.currentLanguage === 'DE' ? 'Sprache' : 'Language' }}</v-col>
                  <v-col cols="8">
                    <v-btn-toggle
                      :model-value="store.currentLanguage"
                      @update:model-value="store.setLanguage($event)"
                      mandatory
                      density="compact"
                      color="primary"
                      variant="outlined"
                      divided
                    >
                      <v-btn value="DE">Deutsch</v-btn>
                      <v-btn value="EN">English</v-btn>
                    </v-btn-toggle>
                  </v-col>
                </v-row>
                <v-row class="align-center mb-4">
                  <v-col cols="4" class="text-caption">{{ store.currentLanguage === 'DE' ? 'Theme' : 'Theme' }}</v-col>
                  <v-col cols="8">
                    <v-btn-toggle
                      :model-value="store.themeMode"
                      @update:model-value="store.setThemeMode($event)"
                      mandatory
                      density="compact"
                      color="primary"
                      variant="outlined"
                      divided
                    >
                      <v-btn value="light">
                        <v-icon start>mdi-weather-sunny</v-icon>
                        {{ store.currentLanguage === 'DE' ? 'Hell' : 'Light' }}
                      </v-btn>
                      <v-btn value="dark">
                        <v-icon start>mdi-weather-night</v-icon>
                        {{ store.currentLanguage === 'DE' ? 'Dunkel' : 'Dark' }}
                      </v-btn>
                    </v-btn-toggle>
                  </v-col>
                </v-row>
              </v-container>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title class="text-subtitle-1">
              {{ store.currentLanguage === 'DE' ? 'Design anpassen' : 'Customize Design' }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-container class="pa-0">
                <v-row class="align-center dense-row mb-2">
                  <v-col cols="4"><span class="text-caption">{{ fieldLabels.fontFamily }}</span></v-col>
                  <v-col cols="8">
                    <v-select
                      :model-value="store.themeSettings.fontFamily"
                      @update:model-value="store.updateThemeSetting('fontFamily', $event)"
                      :items="availableFonts"
                      item-title="title"
                      item-value="value"
                      density="compact"
                      hide-details
                      variant="outlined"
                    ></v-select>
                  </v-col>
                </v-row>

                <v-row v-for="key in themeSettingKeys" :key="key" class="align-center dense-row">
                  <template v-if="key !== 'fontFamily'">
                    <v-col cols="4">
                      <span class="text-caption">{{ fieldLabels[key] || key }}</span>
                    </v-col>
                    <v-col cols="8">
                      <ColorPickerField
                        :model-value="store.themeSettings[key]"
                        @update:model-value="store.updateThemeSetting(key, $event)"
                      />
                    </v-col>
                  </template>
                </v-row>
              </v-container>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn text @click="store.resetThemeSettings" color="warning">
          <v-icon start>mdi-restore</v-icon>
          {{ store.currentLanguage === 'DE' ? 'Zurücksetzen' : 'Reset' }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn text @click="closeDialog" color="primary">
          {{ store.currentLanguage === 'DE' ? 'Schließen' : 'Close' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { useGlobalSettingsStore, availableFonts } from '@/store/globalSettings.ts'; // Importiere Store und Fonts
import ColorPickerField from './ColorPickerField.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(['update:modelValue']);

const store = useGlobalSettingsStore();

const internalDialog = ref(props.modelValue);
watch(() => props.modelValue, (val) => {
  internalDialog.value = val;
});
watch(internalDialog, (val) => {
  emits('update:modelValue', val);
});

// Labels für die Einstellungsfelder (ggf. mehrsprachig machen)
const fieldLabels = computed(() => ({
  primary: store.currentLanguage === 'DE' ? 'Primärfarbe' : 'Primary',
  secondary: store.currentLanguage === 'DE' ? 'Sekundärfarbe' : 'Secondary',
  accent: store.currentLanguage === 'DE' ? 'Akzentfarbe' : 'Accent',
  error: 'Error',
  info: 'Info',
  success: 'Success',
  warning: 'Warning',
  headingColor: store.currentLanguage === 'DE' ? 'Überschriften' : 'Heading Color',
  bodyColor: store.currentLanguage === 'DE' ? 'Textfarbe' : 'Body Text Color',
  backgroundColor: store.currentLanguage === 'DE' ? 'Hintergrund' : 'Background',
  containerColor: store.currentLanguage === 'DE' ? 'Container' : 'Container Color',
  buttonColor: store.currentLanguage === 'DE' ? 'Button Farbe' : 'Button Color',
  buttonTextColor: store.currentLanguage === 'DE' ? 'Button Text' : 'Button Text',
  navBackgroundColor: store.currentLanguage === 'DE' ? 'Nav Hintergrund' : 'Nav Background',
  navTextColor: store.currentLanguage === 'DE' ? 'Nav Text' : 'Nav Text',
  fontFamily: store.currentLanguage === 'DE' ? 'Schriftart' : 'Font Family'
}));

// Hole die Schlüssel aus dem aktuellen Theme
const themeSettingKeys = computed(() =>
  Object.keys(store.themeSettings)
);


function closeDialog() {
  internalDialog.value = false;
}

</script>

<style scoped>
.dense-row {
  margin-bottom: 2px; /* Weniger Abstand zwischen den Zeilen */
  padding-top: 2px;
  padding-bottom: 2px;
}

.v-card-title {
  font-size: 1.1rem;
  padding: 8px 16px;
}
.v-card-text {
  padding: 8px 16px 16px 16px;
}
.v-card-actions {
  padding: 8px 16px;
}
.v-btn-toggle {
  flex-wrap: nowrap;
}
.v-btn-toggle .v-btn {
  flex: 1 1 auto;
  font-size: 0.8rem; /* Kleinere Schrift für Buttons im Toggle */
}
.text-caption {
  font-size: 0.75rem !important; /* Kleinere Labels */
  opacity: 0.8;
}
</style>
