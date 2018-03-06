import { create } from 'domain';

const fs = require('fs');
const envBuild = require('../config/.env.sample.js');

// for each key, write file
// ../rest-server/.env
const createEnvFile = (envObj) => {
  for (let key in envObj) {
    fs.writeFile(`../${key}/.env`, envBuild[key])
  }
}

createEnvFile(envBuild);



  
