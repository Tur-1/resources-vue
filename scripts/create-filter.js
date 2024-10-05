#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import minimist from 'minimist'; // Import minimist

// Manually define __filename and __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the current working directory (the consuming project's directory)
const projectRoot = process.cwd();

// Use minimist to parse arguments
const args = minimist(process.argv.slice(2));
 
// The first positional argument is the class name
const className = args._[0];

// Check if the class name is provided
if (!className) {
  console.error('Please provide a filter class name.');
  process.exit(1);
}

// Determine the target file path based on the presence of subdirectories in the className
let filePath;
if (className.includes('/')) {
   
  const [pageName, file] = className.split('/');
  filePath = path.join(projectRoot, `src/pages/${pageName}/Filters/${file}.js`);
} else { 
  filePath = path.join(projectRoot, `src/Filters/${className}.js`);
}

// Path to the stub file within the package
const stubPath = path.join(__dirname, './../stubs/filter.stub');

// Read the stub file
fs.readFile(stubPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Failed to read stub file:', err);
    process.exit(1);
  }

  // Replace the placeholder with the actual class name (only the last part of the name)
  const content = data.replace(/{{filterName}}/g, path.basename(className));

  // Create the directory if it doesn’t already exist
  fs.mkdir(path.dirname(filePath), { recursive: true }, (err) => {
    if (err) {
      console.error('Failed to create directory:', err);
      process.exit(1);
    }

    // Write the class file with the replaced content
    fs.writeFile(filePath, content, (err) => {
      if (err) {
        console.error('Failed to write file:', err);
        process.exit(1);
      }
      console.log(`Filter class ${className} created successfully at ${filePath}`);
    });
  });
});
