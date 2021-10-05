const Ajv = require("ajv")
var fs = require('fs');
var path = require('path');
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

//var directoryPath = './schemas/1.11.0';
const directoryPath = path.join(__dirname, 'schemas/1.11.0');

fs.readdir(directoryPath, function (err, files) {
  //handling error
  if (err) {
      return console.log('Unable to scan directory: ' + err);
  } 
  //listing all files using forEach
  files.forEach(function (file) {
      // Do whatever you want to do with the file
      
      const filePath = path.join(directoryPath, file);
      fs.readFile(filePath, function (error, content) {
        console.log("Processing file " + file);
        var data = JSON.parse(content);
        //console.log(data.collection.length);
        try{
           const validate = ajv.compile(data);
        }
        catch(errors) {
          console.log(errors)
        }

      });
  });
});
