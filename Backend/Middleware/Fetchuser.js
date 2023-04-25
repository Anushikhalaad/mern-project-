var jwt = require("jsonwebtoken");
const JWT_SECRET = "ramisagoodb$oy";

const Fetchuser = (req, res, next) => {
  //get user id from JWT token and add id to the request object
  const token = req.header("auth-token");

  if (!token) {
    res.status(401).send({ error: "Please Authenticate using valid token " });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);

    req.user = data.user;

    next();
  } catch (error) {
    res.status(401).send({ error: "Please Authenticate using valid token " });
  }
};

module.exports = Fetchuser;
