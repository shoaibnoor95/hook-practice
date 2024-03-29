require('dotenv').config()
const fs = require('fs');
const path = require('path');
const mailer=require('./src/mailer')
const searchString = 'Sequelize.define(';
const directoryToCheck = '../coding-challenge-backend/'; 
function searchInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return content.includes(searchString);
}

function fromDir(startPath, callback) {
  if (!fs.existsSync(startPath)) {
    console.log("Directory not found:  ", startPath);
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

let found = true;
fromDir(directoryToCheck, (filename) => {
  if (!searchInFile(filename)) {
    console.log(`String not found in file: ${filename}`);
    found = false;
    
  }
});

if (!found) {
  console.error('Error: The specified string was not found in one or more files.');
  const HTML=`<p>String does not found in file`,subject='Code convention violated',email='shoaib.noor@iunc.edu.pk ';
  
  mailer({HTML,subject,email})      
  console.log(1)
  process.exit(1);
} else {
  console.log('Success: The specified string was not found.');
}
