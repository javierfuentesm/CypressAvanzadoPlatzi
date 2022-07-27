const { defineConfig } = require("cypress");
const {
  addMatchImageSnapshotPlugin,
} = require("cypress-image-snapshot/plugin");

const values = {};

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
      addMatchImageSnapshotPlugin(on, config);

      config.env.variable = process.env.NODE_ENV ?? "no hay variable";
      on("task", {
        guardar(valor) {
          //get the key from the valor
          const key = Object.keys(valor)[0];
          //get the value from the valor
          values[key] = valor[key];
          //siempre debes de regresar algo sino va a fallar
          return null;
        },
        obtener(key) {
          console.log("values", values);
          return values[key] ?? "no hay valor";
        },
      });

      return config;
    },

    env: {
      credentials: {
        user: "username",
        password: "password",
      },
    },
  },
});
