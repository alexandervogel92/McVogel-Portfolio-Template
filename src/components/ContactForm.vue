<template>
  <!--  FORM  -->
  <v-form ref="formRef" @submit.prevent="submitForm">
    <!-- ◉ Routing-Flag für das Backend  -->
    <input type="hidden" name="site" value="portfolio" />

    <v-container>
      <v-row>
        <!-- Status-Meldungen -->
        <v-col cols="12">
          <v-alert
            v-if="formStatus.message"
            :type="formStatus.type"
            :text="formStatus.message"
            variant="tonal"
            density="compact"
            closable
            :model-value="!!formStatus.message"
            @update:modelValue="val => { if (!val) formStatus.message = '' }"
          />

        </v-col>

        <!-- Name -->
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formData.name"
            name="name"
            :label="labels.name"
            :rules="[rules.required]"
            variant="outlined"
            prepend-inner-icon="mdi-account"
            required
          />
        </v-col>

        <!-- E-Mail -->
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formData.email"
            name="email"
            :label="labels.email"
            :rules="[rules.required, rules.email]"
            variant="outlined"
            prepend-inner-icon="mdi-email"
            type="email"
            required
          />
        </v-col>

        <!-- Betreff optional -->
        <v-col cols="12">
          <v-text-field
            v-model="formData.subject"
            name="subject"
            :label="labels.subject"
            variant="outlined"
            prepend-inner-icon="mdi-pencil"
          />
        </v-col>

        <!-- Nachricht -->
        <v-col cols="12">
          <v-textarea
            v-model="formData.message"
            name="message"
            :label="labels.message"
            :rules="[rules.required]"
            variant="outlined"
            prepend-inner-icon="mdi-message-text"
            rows="5"
            auto-grow
            required
          />
        </v-col>

        <!-- Info -->
        <v-col cols="12">
          <div class="text-caption mb-4">{{ labels.captchaInfo }}</div>
        </v-col>

        <!-- Submit -->
        <v-col cols="12" class="text-center">
          <v-btn
            type="submit"
            color="primary"
            size="large"
            :loading="loading"
            :disabled="loading"
          >
            <v-icon start>mdi-send</v-icon>
            {{ labels.submit }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, inject } from 'vue';
import { useReCaptcha } from 'vue-recaptcha-v3';
import type { VForm } from 'vuetify/components';

// ── i18n ───────────────────────────────────────────────
const currentLanguage = inject<Ref<'DE' | 'EN'>>('currentLanguage', ref('DE'));

// ── Form-State ────────────────────────────────────────
const formRef   = ref<VForm | null>(null);
const loading   = ref(false);
const formStatus = reactive<{ type: 'success' | 'error' | 'info'; message: string }>({
  type: 'success',
  message: '',
});
const formData = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
});

// ── Validation ────────────────────────────────────────
const rules = computed(() => ({
  required: (v: string) => !!v || (currentLanguage.value === 'DE'
    ? 'Dieses Feld ist erforderlich.' : 'This field is required.'),
  email: (v: string) => /.+@.+\..+/.test(v) || (currentLanguage.value === 'DE'
    ? 'Ungültige E-Mail-Adresse.' : 'Invalid e-mail address.'),
}));

// ── UI-Labels ─────────────────────────────────────────
const labels = computed(() => ({
  name:          currentLanguage.value === 'DE' ? 'Ihr Name' : 'Your Name',
  email:         currentLanguage.value === 'DE' ? 'Ihre E-Mail' : 'Your Email',
  subject:       currentLanguage.value === 'DE' ? 'Betreff (Optional)' : 'Subject (Optional)',
  message:       currentLanguage.value === 'DE' ? 'Ihre Nachricht' : 'Your Message',
  submit:        currentLanguage.value === 'DE' ? 'Nachricht senden' : 'Send Message',
  successMessage:currentLanguage.value === 'DE' ? 'Vielen Dank! Ihre Nachricht wurde gesendet.' : 'Thank you! Your message has been sent.',
  errorMessage:  currentLanguage.value === 'DE' ? 'Fehler beim Senden. Bitte später erneut versuchen.' : 'Error sending message. Please try again later.',
  captchaInfo:   currentLanguage.value === 'DE' ? 'Diese Seite ist durch reCAPTCHA geschützt.' : 'This site is protected by reCAPTCHA.',
}));

// ── reCAPTCHA v3 ──────────────────────────────────────
const { executeRecaptcha } = useReCaptcha();   // Site-Key wird global im Plugin gesetzt

// ── Submit ────────────────────────────────────────────
const submitForm = async () => {
  if (!formRef.value) return;

  const { valid } = await formRef.value.validate();
  if (!valid) {
    formStatus.type = 'error';
    formStatus.message = currentLanguage.value === 'DE'
      ? 'Bitte füllen Sie alle Pflichtfelder korrekt aus.'
      : 'Please fill in all required fields correctly.';
    return;
  }

  loading.value = true;
  formStatus.message = '';

  try {
    // 1) reCAPTCHA-Token holen
    const recaptchaToken = await executeRecaptcha('contact_form');

    // 2) FormData bauen (nimmt auch das hidden-Input „site“ mit)
    const fd = new FormData(formRef.value.$el as HTMLFormElement);
    fd.append('recaptcha', recaptchaToken);

    // 3) an FastAPI senden
    const resp = await fetch('/api/contact', {
      method: 'POST',
      body: fd,
    });

    if (resp.ok) {
      formStatus.type = 'success';
      formStatus.message = labels.value.successMessage;
      formRef.value.reset();
    } else {
      const err = await resp.json().catch(() => ({}));
      formStatus.type = 'error';
      formStatus.message = `${labels.value.errorMessage} (${err.detail ?? resp.statusText})`;
    }
  } catch (e) {
    console.error(e);
    formStatus.type = 'error';
    formStatus.message = labels.value.errorMessage;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.v-alert { margin-bottom: 1rem; }
</style>
