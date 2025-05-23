const jwt = require("jsonwebtoken");

function verify(req, res, next) {
  const authHeader = req.headers.authorization; // ✅ FIXED

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You're not authenticate !");
  }
}

module.exports = verify;
