// src/plugins/vuetify.ts
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
// Hole Standardeinstellungen (optional, falls du sie hier brauchst)
// Beachte: Pinia ist hier möglicherweise noch nicht vollständig initialisiert.
// Es ist sicherer, die Standardwerte direkt hier zu definieren oder aus einer einfachen Konstanten-Datei zu laden.
const defaultLightColors = {
    primary: '#1976D2',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    background: '#FFFFFF', // Standard Light Background
    surface: '#FFFFFF', // Standard Light Surface
};
const defaultDarkColors = {
    primary: '#1976D2', // Beispiel Blau
    secondary: '#424242', // Beispiel Grau
    accent: '#82B1FF', // Beispiel Hellblau
    error: '#FF5252', // Beispiel Rot
    info: '#2196F3', // Beispiel Info Blau
    success: '#4CAF50', // Beispiel Grün
    warning: '#FB8C00', // Beispiel Orange
    background: '#121212', // Standard Dark Background
    surface: '#1E1E1E', // Standard Dark Surface
};
const lightTheme = {
    dark: false,
    colors: defaultLightColors,
};
const darkTheme = {
    dark: true,
    colors: defaultDarkColors,
};
export default createVuetify({
    theme: {
        defaultTheme: 'dark', // Starte mit Dark Mode (wird vom Store überschrieben)
        themes: {
            light: lightTheme,
            dark: darkTheme,
        },
    },
});
