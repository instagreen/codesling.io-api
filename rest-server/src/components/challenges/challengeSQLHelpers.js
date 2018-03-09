export const addChallengeHelper = ({ title, content, difficulty }) => {
  return `
    INSERT INTO challenges (title, content, difficulty, rating)
    VALUES ('${title}', '${content}', ${difficulty}, 0)
    RETURNING id, title, content, difficulty
  `;
}

export const getChallengeHelper = ({ challenge_id }) => {
  return `
    SELECT title 
    FROM challenges 
    WHERE id = ${challenge_id}
  `;
};
