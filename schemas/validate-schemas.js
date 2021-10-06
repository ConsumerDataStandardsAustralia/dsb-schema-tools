const Ajv = require("ajv")
var fs = require('fs');
var path = require('path');

const directoryPath = path.join(__dirname, '1.11.0');

var dsbSchemas = [];
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    var i = 0;  
    // create the schema array
    files.forEach(function (file) {
      var filePath = path.join(directoryPath, file);
      var data = JSON.parse(fs.readFileSync(filePath));
      data.$id = file;
      dsbSchemas.push(data);
      i++;  
    });
 });


  try {
     fs.readdir(directoryPath, function (err, files) {
      files.forEach(function (file) {
        
        var filePath = path.join(directoryPath, file);
        console.log('Processing file: ' + filePath);
        var data = JSON.parse(fs.readFileSync(filePath));
        var ajv = new Ajv({strictSchema: false}); 
        var validate = ajv.addSchema(dsbSchemas)
        validate.compile(data);
        console.log("All done!")
      });
    });
  }
  catch(error) {
      console.log(error)
  }
