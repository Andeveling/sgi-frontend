import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Cambia esto si tu app usa otro puerto
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on, config) {
      // Aquí puedes añadir eventos adicionales si los necesitas
    },
  },
});
