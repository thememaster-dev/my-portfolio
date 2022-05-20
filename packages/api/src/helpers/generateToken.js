const jwt = require("jsonwebtoken");

exports.generateToken = function (user) {
  return jwt.sign(
    {
      id: user._id,
      // image: user.image,
      name: user.name,
      email: user.email,
    },
    process.env.APP_SECRET,
    { expiresIn: "24h" }
  );
};
