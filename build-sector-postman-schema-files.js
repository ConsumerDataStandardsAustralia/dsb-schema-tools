// This will create a single schema definition file which the postman collection
// will read in.
// Author: Tomas Schier

// This will generate a file (or files) in the /<VERSION>/postman directory.
// One for each sector listed in the "const sectors" array
// Some manual processing MAY be required after running this program.
// This is to ensure that the Postman collection runner can consume the generated files
// In the generated output files do the following:
// 1. remove all .json and set blank
// 2. change all "$ref": "../common/<FILENAME> to "$ref": "<FILENAME>


var fs = require('fs');
var path = require('path');

const sectors = ['banking', 'energy', 'energy_sdh', 'register', 'dcr', 'admin', 'common'];
const version = '1.17.0';

sectors.forEach(sector => {
  const directoryPath = path.join(__dirname, version + '/schemas/' +  sector );
  var stream = fs.createWriteStream(__dirname + '/' +  version + '/postman/postman-validation-' + sector + '-' + version + '.json');
  var cnt = 0;
  var isFirst = true;

  var files = fs.readdirSync(directoryPath);

      if (isFirst == true) {
        isFirst = false;
        stream.write('{');
      }
  
  cnt = 0;
  isFirst = true;
  files.forEach(function (file) {
    var filePath = path.join(directoryPath, file);
    if (cnt > 0) {
      stream.write(',');
    }
    cnt++;
          
    var data = JSON.parse(fs.readFileSync(filePath));
    var fileName = file.substr(0, file.indexOf('.'));

    data.$id =  file;   
    stream.write('"' + fileName + '" :')
    stream.write(JSON.stringify(data));
    console.log("Processed " + file);  
  
    if (cnt == files.length) {
      stream.write('}');
      stream.end();
      console.log("All done");
    } 
  });

})

