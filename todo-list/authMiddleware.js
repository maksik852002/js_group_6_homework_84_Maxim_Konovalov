const User = require("./models/User");

module.exports = async (req, res, next) => {
  const AuthHeader = req.get("Authorization");
  if (!AuthHeader) {
    return res.status(401).send({ error: "User must be logged in" });
  }
  const [type, token] = AuthHeader.split(" ");
  if (type !== "Token" || !token) {
    return res.status(401).send({ error: "User must be logged in" });
  }
  const user = await User.findOne({ token });
  if (!user) {
    return res.status(401).send({ error: "User must be logged in" });
  }
  req.user = user;
  next();
};
