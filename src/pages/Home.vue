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
              alt="Profile Picture"
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
import { computed, inject, ref, Ref } from 'vue';
import TypingEffect from '@/components/TypingEffect.vue';
import Carousel from '@/components/carousel.vue';
import Resume from '@/pages/Resume.vue';
import aboutData from '@/data/about.json';
import technologies from '@/data/technologies.json';

const currentLanguage = inject<Ref<'DE' | 'EN'>>('currentLanguage');

const aboutContent = computed(() => aboutData[currentLanguage.value.toUpperCase()]);

const typingText = computed(() => {
  if (currentLanguage.value === 'DE') {
    return { initial: "Ich bin ein vielseitiger Entwickler im Frontendöld", replacement: "-, Backend- und Fullstack-Bereich." };
  } else {
    return { initial: "I am a full-stack developer with a strong backgroundesd", replacement: " in both frontend and backend development." };
  }
});

const formattedDescription = computed(() => {
  let text = aboutContent.value.description || '';
  text = text.replace(/~\s*/g, '<br class="description-br">');
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>');
  return text;
});
</script>

<style scoped lang="scss">
.fullpage {
  width: 100%;
  overflow-x: hidden; 
}

.section {
  padding-top: 6rem;
  padding-bottom: 6rem;
  width: 100%;
}

.first-section {
  background-color: var(--background-color);
  min-height: calc(100vh - 64px); 
  display: flex; 
  align-items: center; 
}

.description-text {
  line-height: 1.7; 
  max-width: 600px; 
  margin-left: auto; 
  margin-right: auto;
}

:deep(.description-br) {
  content: "";
  display: block;
  margin-bottom: 0.8em; 
}

:deep(.text-primary) {
  color: rgb(var(--v-theme-primary)) !important;
  font-weight: bold;
}

.profile-avatar {
  border: 4px solid rgba(var(--v-theme-primary-rgb), 0.5); 
  animation: float 6s ease-in-out infinite alternate; 
}

@keyframes float {
  0% { transform: translatey(0px); }
  100% { transform: translatey(-15px); } 
}

#technologies {
  background-color: var(--container-color);
}

.tech-card {
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
  background-color: var(--background-color);
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
  }
}

.tech-chip {
  transition: background-color 0.3s ease, color 0.3s ease;
  cursor: default;
}

.principles-section {
  background-color: var(--background-color);
}



@media (max-width: 960px) {
  .section {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
  .first-section {
    min-height: unset;
    text-align: center; 
  }
  .description-text {
    max-width: 100%; 
  }
  .profile-avatar {
    margin-top: 2rem;
    max-width: 70%;
  }
  .tech-row .v-col-sm-6 {
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 600px) {
  .text-h1, .text-display-1 { font-size: 2.8rem !important; }
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
