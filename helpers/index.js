const generateRandomPassword = (length) => {
  const charset = "0123456789";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomKeys = Math.floor(Math.random() * charset.length);
    password += charset[randomKeys];
  }
  return password;
};

module.exports = { generateRandomPassword };
