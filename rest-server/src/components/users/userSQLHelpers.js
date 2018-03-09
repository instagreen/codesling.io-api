export const fetchAllUserHelper = () => {
  return `
    SELECT id, email, username, password, clout, kdr
    FROM users
  `;
}

export const fetchUserHelper = (email) => {
  console.log('email: ', email);
  return `
    SELECT id, email, username
    FROM users
    WHERE email LIKE '%${email}%' OR username LIKE '%${email}%'
  `;
};
