const express = require("express");
const router = express.Router();
var Fetchuser = require("../Middleware/Fetchuser");
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
var notesController = require("../controller/notesController");

const querySchemaNotes = Joi.object ({

    title: Joi.string().min(3).required(),
    description: Joi.string().required().min(5),
    tag: Joi.string().required()


});

//Route 1:Get all the notes  Using Get: "/api/notes/fetchallnotes".  login required
router.get("/fetchallnotes", Fetchuser, notesController.getAllNotesController);


//Route 2:add the notes  Using Post: "/api/notes/addnotes".  login required
router.post("/addnotes", validator.body(querySchemaNotes), Fetchuser, notesController.addNotesController);


//Route 3: Update the  existing notes  Using Put: "/api/notes/updatenotes".  login required
router.put("/updatenotes/:id", Fetchuser, notesController.updateNotesController);


//Route 4: Delete the  existing notes  Using Delete: "/api/notes/deletenotes".  login required
router.delete("/deletenotes/:id", Fetchuser, notesController.deleteNotesController);


module.exports = router;
