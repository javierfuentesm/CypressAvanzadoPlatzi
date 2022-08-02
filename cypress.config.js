const { defineConfig } = require("cypress");
const {
  addMatchImageSnapshotPlugin,
} = require("cypress-image-snapshot/plugin");
const webpack = require("@cypress/webpack-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");

const values = {};

async function setupNodeEvents(on, config) {
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
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    webpack({
      webpackOptions: {
        resolve: {
          extensions: [".ts", ".js"],
        },
        module: {
          rules: [
            {
              test: /\.feature$/,
              use: [
                {
                  loader: "@badeball/cypress-cucumber-preprocessor/webpack",
                  options: config,
                },
              ],
            },
          ],
        },
      },
    })
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    supportFile: false,
    setupNodeEvents,
  },
});
