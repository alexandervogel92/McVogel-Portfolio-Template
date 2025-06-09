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

## Adding/Editing Pages

Pages are placed under `src/pages` and automatically become routes. Components under `src/components` are auto imported so you can simply create a new file and use it in your templates.

## License

This template is provided without any warranty. Feel free to adapt it for your own portfolio.
