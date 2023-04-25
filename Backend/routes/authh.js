const express = require("express");
const router = express.Router();
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
var Fetchuser = require("../Middleware/Fetchuser");
var authController = require("../controller/authController");



const querySchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  });



  const querySchemaLogin = Joi.object ({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  })

// Route1: Create a User Using POST: "/api/auth/CreateUser". No login required
router.post("/CreateUser", validator.body(querySchema), authController.createUserController);

//Route2:Authenticate  a User Using POST: "/api/auth/Login". No login required

router.post("/login", validator.body(querySchemaLogin), authController.authenticateController);

//Route3:get loggedin user details Using POST: "/api/auth/getuser".  login required
router.post("/getuser", Fetchuser, authController.userDetailController );

module.exports = router;
