
var fs = require('fs');
var path = require('path');

const sector = 'admin';
const version = '1.14.0';

const directoryPath = path.join(__dirname,  'schemas/' +  sector + "/" +  version);
const commonDirectoryPath = path.join(__dirname, 'schemas/common/'+ version);


var stream = fs.createWriteStream(__dirname + "/postman/" + sector + "/postman-" + sector + "-" + version + ".json");

var directories = [directoryPath, commonDirectoryPath];
var cnt = 0;
var isFirst = true;
var dirCnt = 0;
directories.forEach(directoryPath => {
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
      // var objToWrite = { file: data };
      var fileName = file.substr(0, file.indexOf('.'));
      stream.write('"' + fileName + '" :')
      stream.write(JSON.stringify(data));
      console.log("Processed " + file);   
    });
    dirCnt++;
    if (dirCnt == directories.length) {
      stream.write('}');
      stream.end();
      console.log("All done");
    }
  });
})


