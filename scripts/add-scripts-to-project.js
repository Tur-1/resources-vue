#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get the path of the host project's package.json
const packageJsonPath = path.resolve(process.cwd(), 'package.json');

// Load the host project's package.json
let packageJson;
try {
  packageJson = require(packageJsonPath);
} catch (error) {
  console.error("Could not load package.json of the project.", error);
  process.exit(1);
}

// Define the scripts to be added
const customScripts = {
  "make:filter": "node ./node_modules/@tur1/resources-vue/scripts/create-filter.js",
  "make:action": "node ./node_modules/@tur1/resources-vue/scripts/create-action.js",
  "make:resource": "node ./node_modules/@tur1/resources-vue/scripts/create-resource.js",
  "make:page": "node ./node_modules/@tur1/resources-vue/scripts/create-page.js"
};

// Merge the scripts into the host project's package.json
packageJson.scripts = {
  ...packageJson.scripts,
  ...customScripts,
};

// Write the updated package.json back to the file system
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf-8');
console.log("Custom scripts have been added to your project's package.json!");
