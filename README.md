# McVogel Portfolio Template

This project is a Vue 3 + Vuetify based starter for building a personal portfolio website. It includes ready made pages and components for presenting your skills, resume and contact form. The content is provided in English and German and can easily be changed.

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Build for production with:

```bash
npm run build
```

## Customising Texts

All texts shown in the portfolio are stored in JSON files inside `src/data`. Edit these files to change the content:

- `about.json` – introduction on the home page
- `resumeData.json` – resume timeline, skills and education
- `carouselData.json` – text slides in the carousel
- `technologies.json` – list of technologies shown on the home page

Each file contains a `DE` and an `EN` section for the two languages.

## Changing Colours

Theme colours are defined in `src/styles/themeColors.ts`. Update the hex values to adjust the light and dark themes. The application uses these colours via the global settings store so changes are applied automatically.

```ts
export const lightThemeColors = {
  primary: '#1976D2',
  secondary: '#424242',
  // ...
}
```

## Fonts and Theme Settings

Users can switch between a light and dark theme and choose a font in the settings dialog. Available fonts are defined in `src/store/globalSettings.ts`.

## Contact Form

The form shown on the contact page is implemented in `src/components/ContactForm.vue`.
It uses [vue-recaptcha-v3](https://github.com/dongido/vue-recaptcha-v3) to protect
against spam. To enable it you must provide a Google reCAPTCHA V3 site key via
the `VITE_RECAPTCHA_SITE_KEY` environment variable. Create a `.env` file in the
project root and add your key:

```bash
VITE_RECAPTCHA_SITE_KEY=your_site_key_here
```

The component submits the form data to `/api/contact`. You need to implement
this endpoint yourself to verify the reCAPTCHA token and send the email. Any
service can be used (for example a small Node backend using Mailjet).

## Adding/Editing Pages

Pages are placed under `src/pages` and automatically become routes. Components under `src/components` are auto imported so you can simply create a new file and use it in your templates.

## License

This project is released under the terms of the repository specific license
found in [`LICENSE`](LICENSE). You may use and modify the template freely, but
a visible credit linking to this repository must remain on any website built
with it.
