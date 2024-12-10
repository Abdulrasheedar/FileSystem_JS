let fs = require("fs");
let path = require("path");
const folderPath = "/Users/abdulrasheed/Desktop/practice_nodejs/";
let files = fs.readdirSync(folderPath);

//Iterating over all files for the file names
files.forEach((file) => {
  //Extracting extension from the file  
  let fName = path.extname(file).substring(1);
  try {
    if (!fs.existsSync(fName)) {
      let dir = folderPath + fName;
      //Creating a directory with the extension name
      fs.mkdirSync(dir);
      //Filtering the files which has respective extension
      let fileExt = files.filter(
        (value) => path.extname(value).substring(1) === fName
      );

      //copying the files with the extension similar to newly create folder and deleting the file.
      fileExt.forEach((fE) => {
        fs.copyFile(folderPath + fE, dir + "/" + fE, (err) => {
          if (err) {
            console.log("Error Found:", err);
          }
        });

        fs.rm(folderPath + fE, (err) => {
          if (err) {
            throw err;
          }
        });
      });
    }
  } catch (err) {
    // console.log(err);
  }
});
