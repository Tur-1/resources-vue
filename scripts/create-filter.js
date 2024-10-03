#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Manually define __filename and __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the current working directory (the consuming project's directory)
const projectRoot = process.cwd(); // This will now refer to the root of 'vue-laravel-dash'

// Capture the filter name argument passed via npm run
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Please provide a filter class name.');
  process.exit(1);
}

const className = args[0];

// Path to the stub file within the package
const stubPath = path.join(__dirname, './../stubs/filter.stub');

// Read the stub file
fs.readFile(stubPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Failed to read stub file:', err);
    process.exit(1);
  }

  // Replace the placeholder with the actual class name
  const content = data.replace(/{{className}}/g, className);

  // Path where the file will be created in the consuming project's directory
  const filePath = path.join(projectRoot, `src/filters/${className}.js`);

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
