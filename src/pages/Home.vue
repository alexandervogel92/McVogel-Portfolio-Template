<template>
  <div class="fullpage">

    <section class="section first-section d-flex align-center" style="min-height: 90vh;">
    <v-container>
      <v-row class="align-center justify-center">

        <v-col cols="12" md="7" class="text-center text-md-left pr-md-6">
          <h3 class="text-h4 text-sm-h3 text-lg-h2 mb-2" :style="{ color: 'var(--heading-color)' }">
            {{ aboutContent.welcome }}
          </h3>
          <h1 class="text-h2 text-sm-h1 text-lg-display-1 font-weight-bold mb-4 text-primary">
            {{ aboutContent.name }}
          </h1>
          <TypingEffect
            v-if="typingText"
            :text="typingText.initial"
            :replacement="typingText.replacement"
            class="text-h6 text-md-h5 mb-6"
            :style="{ color: 'var(--body-color)' }"
          />

          <div
            class="text-body-1 text-md-h6 mb-8 description-text"
            :style="{ color: 'var(--body-color)' }"
            v-html="formattedDescription"
          ></div>

          <v-btn color="primary" size="large" :to="{ name: 'Contact' }" class="mr-4 mb-4 mb-md-0">
            <v-icon start>mdi-email-outline</v-icon>
            {{ aboutContent.contact_me }}
          </v-btn>

        </v-col>

        <v-col cols="10" sm="8" md="5" class="text-center mt-6 mt-md-0">
          <v-avatar size="clamp(200px, 80%, 400px)" rounded="lg" elevation="12" class="profile-avatar">
            <v-img
              src="@/assets/me.png"
              alt="Profilbild von Alex"
              cover
              aspect-ratio="1"
            ></v-img>
          </v-avatar>
        </v-col>

      </v-row>
    </v-container>
  </section>

    <section id="technologies" class="section py-12" :style="{ backgroundColor: 'var(--container-color)' }">
      <v-container>
        <h2 class="text-h4 text-center mb-10" :style="{ color: 'var(--heading-color)' }">
          {{ aboutContent.technologies }}
        </h2>

        <v-row justify="center" class="tech-row">
          <v-col cols="12" sm="6" lg="3">
            <v-card class="pa-4 text-center fill-height tech-card" elevation="4">
              <v-card-title class="justify-center">
                <v-icon left color="blue" size="large">mdi-monitor-cellphone-star</v-icon>
                <span class="ml-2 text-h6">Frontend</span>
              </v-card-title>
              <v-card-text>
                <v-chip
                  v-for="tech in technologies.frontend"
                  :key="tech.name"
                  class="ma-1 tech-chip"
                  :color="tech.color || 'primary'"
                  label
                  variant="flat"
                >
                  <v-icon start :icon="tech.icon"></v-icon>
                  {{ tech.name }}
                </v-chip>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" lg="3">
            <v-card class="pa-4 text-center fill-height tech-card" elevation="4">
              <v-card-title class="justify-center">
                <v-icon left color="green" size="large">mdi-server-network</v-icon>
                <span class="ml-2 text-h6">Backend</span>
              </v-card-title>
              <v-card-text>
                <v-chip
                  v-for="tech in technologies.backend"
                  :key="tech.name"
                  class="ma-1 tech-chip"
                  :color="tech.color || 'secondary'"
                  label
                  variant="flat"
                >
                  <v-icon start :icon="tech.icon"></v-icon>
                  {{ tech.name }}
                </v-chip>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" lg="3">
            <v-card class="pa-4 text-center fill-height tech-card" elevation="4">
              <v-card-title class="justify-center">
                <v-icon left color="orange" size="large">mdi-database</v-icon>
                <span class="ml-2 text-h6">Datenbanken</span>
              </v-card-title>
              <v-card-text>
                <v-chip
                  v-for="tech in technologies.databases"
                  :key="tech.name"
                  class="ma-1 tech-chip"
                  :color="tech.color || 'warning'"
                  label
                  variant="flat"
                >
                  <v-icon start :icon="tech.icon"></v-icon>
                  {{ tech.name }}
                </v-chip>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" lg="3">
            <v-card class="pa-4 text-center fill-height tech-card" elevation="4">
              <v-card-title class="justify-center">
                <v-icon left color="purple" size="large">mdi-tools</v-icon>
                <span class="ml-2 text-h6">DevOps & Tools</span>
              </v-card-title>
              <v-card-text>
                <v-chip
                  v-for="tech in technologies.devops"
                  :key="tech.name"
                  class="ma-1 tech-chip"
                  :color="tech.color || 'accent'"
                  label
                  variant="flat"
                >
                  <v-icon start :icon="tech.icon"></v-icon>
                  {{ tech.name }}
                </v-chip>
              </v-card-text>
            </v-card>
          </v-col>

        </v-row>
      </v-container>
    </section>

    <section id="resume" class="section py-12" :style="{ backgroundColor: 'var(--background-color)' }">
      <v-container>
        <Resume />
      </v-container>
    </section>

<!--    <section id="skills" class="section py-12" :style="{ backgroundColor: 'var(&#45;&#45;background-color)' }">-->
<!--      <v-container>-->
<!--        <Skills />-->
<!--      </v-container>-->
<!--    </section>-->

    <section class="section principles-section py-12" :style="{ backgroundColor: 'var(--background-color)' }">
      <v-container>
        <h2 class="text-h4 text-center mb-8" :style="{ color: 'var(--heading-color)' }">
          {{ currentLanguage === 'DE' ? 'Meine Prinzipien' : 'My Principles' }}
        </h2>
        <Carousel />
      </v-container>
    </section>

  </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref, Ref } from 'vue'; // ref und Ref hinzugefügt für inject default
import TypingEffect from '@/components/TypingEffect.vue';
import Carousel from '@/components/carousel.vue';
import Resume from '@/pages/Resume.vue';
// import Skills from '@/components/Skills2.vue'
import aboutData from '@/data/about.json';
import technologies from '@/data/technologies.json'; // Importiere Technologiedaten

// Sprachabhängigkeit über inject holen (mit Defaultwert für den Fall, dass es nicht provided wird)
const currentLanguage = inject<Ref<'DE' | 'EN'>>('currentLanguage');

const aboutContent = computed(() => aboutData[currentLanguage.value.toUpperCase()]);

// Text für Typing Effect (Beispiel - anpassen!)
const typingText = computed(() => {
  if (currentLanguage.value === 'DE') {
    // Beispiel: Wechsle zwischen verschiedenen Rollen/Skills
    return { initial: "Ich bin ein vielseitiger Entwickler im Frontendöld", replacement: "-, Backend- und Fullstack-Bereich." };
  } else {
    return { initial: "I am a full-stack developer with a strong backgroundesd", replacement: " in both frontend and backend development." };
  }
});

// Formatiert die Beschreibung: ersetzt ~ mit <br> und **text** mit <strong>text</strong>
const formattedDescription = computed(() => {
  let text = aboutContent.value.description || '';
  text = text.replace(/~\s*/g, '<br class="description-br">'); // Ersetzt Tilde mit Zeilenumbruch (mit Klasse)
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>'); // Ersetzt **text** mit <strong>text</strong> und Primärfarbe
  return text;
});
</script>

<style scoped lang="scss">
.fullpage {
  width: 100%;
  overflow-x: hidden; /* Verhindert horizontales Scrollen */
}

.section {
  padding-top: 6rem;
  padding-bottom: 6rem;
  width: 100%;
}

.first-section {
  // Nutzt Hintergrundfarbe vom Theme
  // background: linear-gradient(135deg, rgba(var(--v-theme-primary-rgb), 0.1) 0%, var(--background-color) 70%);
  background-color: var(--background-color);
  min-height: calc(100vh - 64px); /* Volle Höhe minus Top-App-Bar (Annahme: 64px) */
  display: flex; /* Stellt sicher, dass align-items funktioniert */
  align-items: center; /* Vertikal zentrieren */
}

.description-text {
  line-height: 1.7; /* Verbesserte Lesbarkeit für längeren Text */
  max-width: 600px; /* Begrenzt die Breite auf Desktops */
  margin-left: auto; /* Zentriert auf mobilen Geräten, wenn text-center aktiv ist */
  margin-right: auto;
}

// Style für Zeilenumbrüche im Beschreibungstext
:deep(.description-br) {
  content: "";
  display: block;
  margin-bottom: 0.8em; /* Abstand nach Zeilenumbruch */
}

// Style für hervorgehobenen Text
:deep(.text-primary) {
  color: rgb(var(--v-theme-primary)) !important;
  font-weight: bold;
}

.profile-avatar {
  border: 4px solid rgba(var(--v-theme-primary-rgb), 0.5); /* Rahmen in Primärfarbe */
  animation: float 6s ease-in-out infinite alternate; /* Sanftere Animation */
}

@keyframes float {
  0% { transform: translatey(0px); }
  100% { transform: translatey(-15px); } /* Weniger Bewegung */
}

// Technologie Sektion
#technologies {
  background-color: var(--container-color); // Nutzt Container Farbe für Kontrast
}

.tech-card {
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
  background-color: var(--background-color); // Hintergrund der Karten dunkler als Section
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
  }
}

.tech-chip {
  transition: background-color 0.3s ease, color 0.3s ease;
  cursor: default; // Zeigt an, dass es nicht klickbar ist
  // Helle Textfarbe für dunkle Chips (falls Chip-Farbe angepasst wird)
  // color: #fff;
}

// Prinzipien Sektion
.principles-section {
  background-color: var(--background-color);
}


/* Responsive Anpassungen */
@media (max-width: 960px) { // md breakpoint
  .section {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
  .first-section {
    min-height: unset; // Auf mobilen Geräten keine feste Mindesthöhe
    text-align: center; /* Zentriert den Text auf Mobile */
  }
  .description-text {
    max-width: 100%; /* Volle Breite auf Mobile */
  }
  .profile-avatar {
    margin-top: 2rem; // Mehr Abstand oben auf Mobile
    max-width: 70%; // Kleinere Avatar auf Mobile
  }
  .tech-row .v-col-sm-6 {
    margin-bottom: 1.5rem; // Abstand zwischen Karten auf Mobile/Tablet
  }
}

@media (max-width: 600px) { // sm breakpoint
  .text-h1, .text-display-1 { font-size: 2.8rem !important; } // Kleinere Überschriften auf Mobile
  .text-h2 { font-size: 2rem !important; }
  .text-h4 { font-size: 1.5rem !important; }
  .text-h5 { font-size: 1.1rem !important; }
  .text-h6 { font-size: 1rem !important; }
  .section {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
}

</style>
