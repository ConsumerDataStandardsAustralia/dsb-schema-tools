// This will create a single schema definition file which the postman collection
// will read in.
// Author: Tomas Schier

// This will generate a file (or files) in the /<VERSION>/postman directory.
// One for each sector listed in the "const sectors" array
// Some manual processing MAY be required after running this program.
// This is to ensure that the Postman collection runner can consume the generated files


var fs = require('fs');
var path = require('path');

const sectors = ['banking', 'energy', 'energy_sdh', 'register', 'dcr', 'admin', 'common', 'telco'];
//const sectors = ['energy'];
const version = '1.28.0';

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
    
    let fileString = fs.readFileSync(filePath).toString();
    var data = JSON.parse(fileString.replaceAll('.json', ''));

    var fileName = file.substr(0, file.indexOf('.'));
    console.log("Processing " + file);  
    var idSt = file.split('.')[0];
    data.$id =  idSt;   
    stream.write('"' + fileName + '" :')
    console.log("Writing " + data); 
    stream.write(JSON.stringify(data, null, 2));
    console.log("Processed " + file);  
  
    if (cnt == files.length) {
      stream.write('}');
      stream.end();
      console.log("All done");
    } 
  });

})

