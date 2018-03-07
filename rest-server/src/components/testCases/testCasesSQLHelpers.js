export const addTestCaseHelper = ({ content, challenge_id, input, output }) => {
  console.log('whats coming in', content, challenge_id, input, output)
  let inputString = JSON.stringify(input);
  let outputString = JSON.stringify(output);
  console.log('----strings?', typeof inputString, typeof outputString);
  return `
    INSERT INTO testCases (content, challenge_id, input, output)
    VALUES ('${content}', ${challenge_id}, ${inputString}, ${outputString})
  `;
};

// helper to add input & output to testcases table

// OG 
// export const addTestCaseHelper = ({ content, challenge_id }) => {
//   return `
//     INSERT INTO testCases (content, challenge_id,)
//     VALUES ('${content}', ${challenge_id})
//   `;
// };

