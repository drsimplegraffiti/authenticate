// authentication
// authorization

const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        error: "Unauthorized ================= error 1",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        error: "Token tampered with",
      });
    }

    req.user = decoded; // create a custom name called user
    // req.user.id; // get the id from the user
    // req.user.email;

    next();
  } catch (error) {
    return res.status(401).json({
      error: " Invalid Token",
    });
  }
};

module.exports = isAuthenticated;

// const string = "bearer token";
// const result = string.split(" ");
// const result1 = string.split(" ")[0];
// const result2 = string.split(" ")[1];
// console.log(result);
// console.log(result1);
// console.log(result2);
