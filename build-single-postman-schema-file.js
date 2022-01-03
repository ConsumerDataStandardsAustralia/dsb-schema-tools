
var fs = require('fs');
var path = require('path');

const sectors = ['banking', 'energy', 'admin', 'dcr', 'common'];
const version = '1.15.0';

sectors.forEach(sector => {
  const directoryPath = path.join(__dirname,  'schemas/' +  sector + "/" +  version);
  var stream = fs.createWriteStream(__dirname + "/postman/" + sector + "/postman-validation-" + sector + "-" + version + ".json");
  var cnt = 0;
  var isFirst = true;
  var dirCnt = 0;
  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    // create the schema array
    files.forEach(function (file) {
      var filePath = path.join(directoryPath, file);
      if (cnt > 0) {
        stream.write(',');
      }
      cnt++;
      if (isFirst == true) {
        isFirst = false;
        stream.write('{');
      }
            
      var data = JSON.parse(fs.readFileSync(filePath));
      var fileName = file.substr(0, file.indexOf('.'));
      data.$id =  fileName;
      stream.write('"' + fileName + '" :')
      stream.write(JSON.stringify(data));
      console.log("Processed " + file);  
    
      if (cnt == files.length) {
        stream.write('}');
        stream.end();
        console.log("All done");
      } 
    });
  });
})


