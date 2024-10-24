#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { toSnakeCase, singularize } from "../src/helpers/index.js";

// Manually define __filename and __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the current working directory (the consuming project's directory)
const projectRoot = process.cwd();

// Capture the page name
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Please provide a page name.');
  process.exit(1);
}

const pageName = args[0];
const PageNameSingular = singularize(pageName); 
const singularPageName = toSnakeCase(singularize(pageName)); 
const snakeCasePageName = toSnakeCase(pageName); 

// the page root directory
const pageRootDir = path.join(projectRoot, `src/pages/${pageName}`);

// Check if the page directory already exists
if (fs.existsSync(pageRootDir)) {
  console.error(`The page "${pageName}" already exists.`);
  process.exit(1);
}

const structure = {
  [`src/pages/${pageName}/Actions/DeleteAction.js`]: path.join(__dirname, './../stubs/deleteAction.stub'),
  [`src/pages/${pageName}/Actions/View${PageNameSingular}.js`]: path.join(__dirname, './../stubs/ViewAction.stub'),
  [`src/pages/${pageName}/Actions/Edit${PageNameSingular}.js`]: path.join(__dirname, './../stubs/EditAction.stub'),
  [`src/pages/${pageName}/Actions/Create${PageNameSingular}.js`]: path.join(__dirname, './../stubs/CreateAction.stub'),
  [`src/pages/${pageName}/Filters/ExampleFilter.js`]: path.join(__dirname, './../stubs/filter.stub'),
  [`src/pages/${pageName}/api/use${pageName}Api.js`]: path.join(__dirname, './../stubs/api.stub'), 
  [`src/pages/${pageName}/routes/${pageName}Routes.js`]: path.join(__dirname, './../stubs/routes.stub'),
  [`src/pages/${pageName}/services/use${pageName}Service.js`]: path.join(__dirname, './../stubs/serivce.stub'),
  [`src/pages/${pageName}/stores/${pageName}Store.js`]: path.join(__dirname, './../stubs/stores.stub'),
  [`src/pages/${pageName}/views/create.vue`]: path.join(__dirname, './../stubs/createView.stub'),
  [`src/pages/${pageName}/views/edit.vue`]: path.join(__dirname, './../stubs/editView.stub'),
  [`src/pages/${pageName}/views/list.vue`]: path.join(__dirname, './../stubs/indexView.stub'),
  [`src/pages/${pageName}/views/show.vue`]: path.join(__dirname, './../stubs/show.stub'),
  [`src/pages/${pageName}/${pageName}Resource.js`]: path.join(__dirname, './../stubs/resource.stub')
};

// Helper function to create a file from a stub
const createFileFromStub = (filePath, stubPath) => {
  const dirName = path.dirname(filePath);

  // Create the directory if it doesn't exist
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
  }
 
  // Read from the stub file if it exists
  if (stubPath && fs.existsSync(stubPath)) {
    const stubContent = fs.readFileSync(stubPath, 'utf8');
    // Replace any placeholders in the stub
    const content = stubContent.replace(/{{pageName}}/g, pageName)
    .replace(/{{singularPageName}}/g, singularPageName)
    .replace(/{{filterName}}/g, 'ExampleFilter')
    .replace(/{{snakeCasePageName}}/g, snakeCasePageName)
    .replace(/{{PageNameSingular}}/g, PageNameSingular)
    fs.writeFileSync(filePath, content, 'utf8'); 
  } else {
    // If no stub, create an empty file
    fs.writeFileSync(filePath, '', 'utf8');
  }
};

// Create the directory structure and files based on stubs
Object.keys(structure).forEach((filePath) => {
  const fullFilePath = path.join(projectRoot, filePath);
  const stubPath = structure[filePath];
  createFileFromStub(fullFilePath, stubPath);
});

// Step 4: Update the router/index.js
const routerFilePath = path.join(projectRoot, 'src/router/index.js');

// Read the current router file
fs.readFile(routerFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading router file: ${err}`);
    return;
  }

  // Prepare the import statement and route entry
  const importStatement = `import ${pageName}Routes from '@/pages/${pageName}/routes/${pageName}Routes';\n`;
  const newRoute = `    ...${pageName}Routes,`;

  // Check if the import statement already exists
  if (data.includes(importStatement)) {
  } else {
    // Insert the import statement right before the last existing import statement
    const importPosition = data.lastIndexOf('import');
    const endOfImportPosition = data.indexOf(';', importPosition) + 1;
    const updatedWithImport = data.slice(0, endOfImportPosition) + `${importStatement}` + data.slice(endOfImportPosition);

    // Proceed to routes modification
    data = updatedWithImport;
  }

  // Check if the routes entry already exists
  if (data.includes(newRoute)) {
  } else {
    // Insert the new route into the routes array
    const updatedRouterFile = data.replace(/(routes: \[)/, `$1\n${newRoute}`);
    fs.writeFile(routerFilePath, updatedRouterFile, 'utf8', (writeErr) => {
      if (writeErr) {
        console.error(`Error writing router file: ${writeErr}`);
        return;
      }
    });
  }
});



console.log(`\n${pageName} page created successfully.`);
