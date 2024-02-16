const fs = require('fs');
const path = require('path');

const searchString = 'shoaib';
const directoryToCheck = 'src'; 
function searchInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return content.includes(searchString);
}

function fromDir(startPath, callback) {
  if (!fs.existsSync(startPath)) {
    console.log("Directory not found: ", startPath);
    return;

  }
  
  const files = fs.readdirSync(startPath);
  files.forEach((file) => {
    const filename = path.join(startPath, file);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      fromDir(filename, callback); 
    } else {
      callback(filename);
    }
  });
}

let found = false;
fromDir(directoryToCheck, (filename) => {
  if (searchInFile(filename)) {
    process.exit(1)
    console.log(`String found in file: ${filename}`);
    found = true;
  }
});

if (found) {
  console.error('Error: The specified string was found in one or more files.');
  process.exit(1);
} else {
  console.log('Success: The specified string was not found.');
}
