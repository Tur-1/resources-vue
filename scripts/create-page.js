#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Manually define __filename and __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const singularize = (name) => {
 
    const endings = {
        ves: 'fe',
        ies: 'y',
        i: 'us',
        zes: 'ze',
        ses: 's',
        es: 'e',
        s: ''
    };
    return name.replace(
        new RegExp(`(${Object.keys(endings).join('|')})$`), 
        r => endings[r]
    );

};
const toSnakeCase = (str) => {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
};

// Get the current working directory (the consuming project's directory)
const projectRoot = process.cwd();

// Capture the page name passed via npm run
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Please provide a page name.');
  process.exit(1);
}

const pageName = args[0];
const singularPageName = toSnakeCase(singularize(pageName)); 
const snakeCasePageName = toSnakeCase(pageName); 

// Define the structure using stubs
const structure = {
  [`src/pages/${pageName}/Actions/.gitkeep`]:'',
  [`src/pages/${pageName}/Filters/.gitkeep`]: '', 
  [`src/pages/${pageName}/api/use${pageName}Api.js`]: path.join(__dirname, './../stubs/api.stub'), 
  [`src/pages/${pageName}/routes/${pageName}Routes.js`]: path.join(__dirname, './../stubs/routes.stub'),
  [`src/pages/${pageName}/services/use${pageName}Service.js`]: path.join(__dirname, './../stubs/serivce.stub'),
  [`src/pages/${pageName}/stores/${pageName}Store.js`]: path.join(__dirname, './../stubs/store.stub'),
  [`src/pages/${pageName}/views/create.vue`]: path.join(__dirname, './../stubs/createView.stub'),
  [`src/pages/${pageName}/views/edit.vue`]: path.join(__dirname, './../stubs/editView.stub'),
  [`src/pages/${pageName}/views/index.vue`]: path.join(__dirname, './../stubs/indexView.stub'),
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
    .replace(/{{snakeCasePageName}}/g, snakeCasePageName);
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

console.log(`\n${pageName} page structure created successfully.`);
