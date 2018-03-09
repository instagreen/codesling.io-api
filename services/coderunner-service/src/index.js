import { writeFile } from 'fs';
import { execFile } from 'child_process';
import express from 'express';
import bodyParser from 'body-parser';
import tmp from 'tmp';
import cors from 'cors';
// import vm from 'vm';

import { success } from './lib/log';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.post('/submit-code', (req, res) => {
  console.log('--*********req.body from services index.js--', req.body.code, req.body.funcName, req.body.testCases[0].input, req.body.testCases[0].output, req.body.id);
  // TEST
  const withInvoc = `${req.body.code} add2Nums(1,2); add2Nums(3,4); add2Nums(5,6);`;
  // TEST
  tmp.file({ postfix: '.js' }, (errCreatingTmpFile, path) => {
    writeFile(path, withInvoc, (errWritingFile) => {
      if (errWritingFile) {
        res.send(errWritingFile);
      } else {
        execFile('node', [path], (errExecutingFile, stdout, stderr) => {
          if (errExecutingFile) {
            let stderrFormatted = stderr.split('\n');
            stderrFormatted.shift();
            stderrFormatted = stderrFormatted.join('\n');
            res.send(stderrFormatted);
          } else {
            res.write(JSON.stringify(stdout));
            res.send();
          }
        });
      }
    });
  });
});

app.listen(PORT, success(`coderunner-service is listening on port ${PORT}`));
