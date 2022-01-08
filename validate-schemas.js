// This routine is used to validate the set set files
// It utilises the ajv validator and will pick up most inconsistencies
// Author: Tomas Schier


const Ajv = require("ajv")
var fs = require('fs');
var path = require('path');
const addFormats = require("ajv-formats");
const { Console } = require("console");


const sectors = ['banking', 'register', 'energy', 'dcr', 'admin'];
const version = '1.15.0';

sectors.forEach(sector => {
  const directoryPath = path.join(__dirname, version + '/schemas/' + sector);
  const commonDirectoryPath = path.join(__dirname, version + '/schemas/common');
  var dsbSchemas = [];
  // Read the common schemas
  var commonFiles = fs.readdirSync(commonDirectoryPath);


  commonFiles.forEach(function (file) {
    var filePath = path.join(commonDirectoryPath, file);
    var data = JSON.parse(fs.readFileSync(filePath));
    //var fileName = file.substr(0, file.indexOf('.'));
    data.$id = 'common/' + file;
    dsbSchemas.push(data);
  });
  console.log("Added Common for " + sector + " validation");

  // Read the schemas to be validated
  var files = fs.readdirSync(directoryPath);

  files.forEach(function (file) {
    var filePath = path.join(directoryPath, file);
    var data = JSON.parse(fs.readFileSync(filePath));
    //var fileName = file.substr(0, file.indexOf('.'));
    data.$id = file;
    dsbSchemas.push(data);
  });
  var ajv = new Ajv({ strictSchema: false });
  addFormats(ajv);
  // Configure the validator by adding the schema arrays
  var validate = ajv.addSchema(dsbSchemas);
  files.forEach(file => {
    var filePath = path.join(directoryPath, file);
    //console.log('Processing file: ' + filePath);
    var data = JSON.parse(fs.readFileSync(filePath));
    validate.compile(data);

  });
  console.log("Validated " + sector);

  console.log("All done for " + sector)
});

