export const addTestCaseHelper = ({ content, challenge_id, input, output }) => {
  let inputString = `[${input}]`;
  let outputString = `[${output}]`;
  
  console.log('types', Array.isArray(JSON.parse(inputString)[0]), typeof JSON.parse(outputString));
  return `
    INSERT INTO testCases (content, challenge_id, input, output)
    VALUES ('${content}', ${challenge_id}, '${inputString}', '${outputString}')
  `;
};

// retrieve record from testCases
export const getTestCaseHelper = ({ challenge_id }) => {
  return `
    SELECT input, output 
    FROM testCases 
    WHERE challenge_id = ${challenge_id}
  `;
};



