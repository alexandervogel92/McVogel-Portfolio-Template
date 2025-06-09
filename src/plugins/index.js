/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */
// Plugins
import vuetify from './vuetify';
import router from '../router/index';
export function registerPlugins(app) {
    app
        .use(vuetify)
        .use(router);
}
