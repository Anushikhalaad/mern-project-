const User = require("../models/User");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT_SECRET = "ramisagoodb$oy";


// authController 1: Create a User Using POST: "/api/auth/CreateUser". No login required
exports.createUserController = async (req, res) => {

  let success = false;
    
    //  check weather the user with the same email available
    try {
      let user = await User.findOne({ email: req.body.email });
      
      if (user) {
        return res.status(400).json({ success, error: "sorry user with same id exist already" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      //using auth token to sing the user id with jwt secret 
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true ;
      console.log(authtoken);
      res.json({ success, authtoken });

      //res.json(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }

//Controller2:Authenticate  a User Using POST: "/api/auth/Login". No login required.

exports.authenticateController = async (req, res) => {
    let success = false;
    const { email, password } = req.body;
    console.log("request", req.body)

    try {
      let user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ error: "Please enter the valid credential" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        success = false;
        res.status(400).json({ success ,error: "Please enter the valid credential" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }

  //Controller3:get loggedin user details Using POST: "/api/auth/getuser".  login required

exports.userDetailController = async (req, res) => {
    try {
      // eslint-disable-next-line no-undef
      userId = req.user.id;
      // eslint-disable-next-line no-undef
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }


  
