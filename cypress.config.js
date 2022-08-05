const { defineConfig } = require("cypress");
const {
  addMatchImageSnapshotPlugin,
} = require("cypress-image-snapshot/plugin");
const webpack = require("@cypress/webpack-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

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
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    webpack({
      webpackOptions: {
        resolve: {
          extensions: [".ts", ".js"],
          fallback: {
            util: false,
          },
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
  // on("file:preprocessor", webpack);
  allureWriter(on, config);
  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  // reporter: "cypress-multi-reporters",
  // reporterOptions: {
  //   configFile: "reporter-config.json",
  // },
  env: {
    allure: true,
    allureClearSkippedTests: true,
  },
  e2e: {
    baseUrl: "https://pokedexpokemon.netlify.app",
    experimentalSessionAndOrigin: true,
    specPattern: "**/*.feature",
    // supportFile: false,
    setupNodeEvents,
  },
});
