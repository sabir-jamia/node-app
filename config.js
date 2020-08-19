module.exports = {
  jwt: {
    secret: "node-app#4%@4532",
    options: {
      audience: "http://localhost:8080",
      expiresIn: "2d",
      issuer: "localhost:8080",
    },
    cookie: {
      httpOnly: true,
      sameSite: true,
      signed: true,
    },
  },
};
