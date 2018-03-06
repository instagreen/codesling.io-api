const fs = require('fs');
const path = require('path');
const envBuild = require('../config/.env.sample.js');

// for each key, write file
// ../rest-server/.env
const createEnvFile = (envObj) => {
  for (let key in envObj) {
    for (let i = 0; i < envObj[key].length; i++) {
      fs.appendFile(path.join(__dirname, `/../${key}/.env`), `${envObj[key][i]}\n`, (err) => {
        if (err){
          console.log(err);
        }
      });
    }
  }
}

createEnvFile(envBuild);



  
