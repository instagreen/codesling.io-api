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
  const fn = req.body.funcName;
  const inputs = JSON.parse(req.body.testCases[0].input);
  const outputs = JSON.parse(req.body.testCases[0].output);

  console.log('----',outputs[0], typeof outputs[0]);

  const withInvoc = `${req.body.code} ${fn}(${inputs[0]},${inputs[1]});`;
  //
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
            console.log('stdout',stdout);
            //
              if (stdout == outputs[0]) {
                res.write(`-----GREAT JOB!----- \n expected ${fn}(${inputs[0]},${inputs[1]}) to equal ${outputs[0]} \n and got ${stdout}`);
                res.send();
              } else {
                res.send(`-----DISGRACE!----- \n expected ${fn}(${inputs[0]},${inputs[1]}) to equal ${outputs[0]} \n but got ${stdout}`);
              }
          }
        });
      }
    });
  });
});

app.listen(PORT, success(`coderunner-service is listening on port ${PORT}`));
