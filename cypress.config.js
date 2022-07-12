const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://pokedexpokemon.netlify.app",
    experimentalSessionAndOrigin: true,
    retries: 2,
    // retries: {
    //   // Configure retry attempts for `cypress run`
    //   // Default is 0
    //   runMode: 2,
    //   // Configure retry attempts for `cypress open`
    //   // Default is 0
    //   openMode: 0,
    // },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
