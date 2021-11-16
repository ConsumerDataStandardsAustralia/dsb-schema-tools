const Ajv = require("ajv")
var fs = require('fs');
var path = require('path');
const addFormats = require("ajv-formats")

const sector = 'banking';
const version = '1.14.0';

const directoryPath = path.join(__dirname, sector + '/' + version);
const commonDirectoryPath = path.join(__dirname, 'common/'+ version);

// create the schema array
var dsbSchemas = [];

// Read the schemas to be validated
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }    
    files.forEach(function (file) {
      var filePath = path.join(directoryPath, file);
      var data = JSON.parse(fs.readFileSync(filePath));
      data.$id = file;
      dsbSchemas.push(data);
    });
 });

 // read the commonly referenced schemas 
 fs.readdir(commonDirectoryPath, function (err, files) {
  //handling error
  if (err) {
      return console.log('Unable to scan directory: ' + err);
  } 
  files.forEach(function (file) {
    var filePath = path.join(commonDirectoryPath, file);
    var data = JSON.parse(fs.readFileSync(filePath));
    data.$id = file;
    dsbSchemas.push(data); 
  });
});


// Do the actual validation
try {
    fs.readdir(directoryPath, function (err, files) {
    files.forEach(function (file) {
      
      var filePath = path.join(directoryPath, file);
      console.log('Processing file: ' + filePath);
      var data = JSON.parse(fs.readFileSync(filePath));
      var ajv = new Ajv({strictSchema: false}); 
      addFormats(ajv);
      // Configure the validator by adding the schema arrays
      var validate = ajv.addSchema(dsbSchemas);
      // Call the validation check
      validate.compile(data);      
    });
    console.log("All done!")
  });
}
catch(error) {
    console.log(error)
}
