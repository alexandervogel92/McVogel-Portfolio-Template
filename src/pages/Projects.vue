<template>
  <v-container class="py-12">
    <h2>Projects</h2>
    <v-btn-toggle v-model="viewMode" mandatory>
      <v-btn value="list">Liste</v-btn>
      <v-btn value="slider">Slider</v-btn>
    </v-btn-toggle>
    <div v-if="loading" class="text-center py-4">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-else>
      <v-row v-if="viewMode === 'list'">
        <v-col cols="12" sm="6" md="4" v-for="project in projects" :key="project.id">
          <v-card>
            <v-card-title>{{ project.title }}</v-card-title>
            <v-card-text>{{ project.description }}</v-card-text>
            <v-card-actions>
              <v-btn text :href="project.link" target="_blank">Mehr erfahren</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-carousel v-else hide-delimiter-background height="300">
        <v-carousel-item v-for="project in projects" :key="project.id">
          <v-sheet class="fill-height" color="primary" dark>
            <v-row class="fill-height" align="center" justify="center">
              <div class="text-center">
                <h3>{{ project.title }}</h3>
                <p>{{ project.description }}</p>
                <v-btn text :href="project.link" target="_blank">Mehr erfahren</v-btn>
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: "Projects",
  data() {
    return {
      viewMode: 'list',
      projects: [],
      loading: true
    }
  },
  mounted() {
    axios.get('api/projects')
      .then(response => {
        this.projects = response.data
      })
      .catch(error => {
        console.error("Error loading projects:", error)
      })
      .finally(() => {
        this.loading = false
      })
  }
}
</script>
