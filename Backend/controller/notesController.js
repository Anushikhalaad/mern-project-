
const Note = require("../models/Note");


//noteController 1:Get all the notes  Using Get: "/api/notes/fetchallnotes".  login required

exports.getAllNotesController = async (req, res) => {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  }


//noteController 2:add the notes  Using Post: "/api/notes/addnotes".  login required

exports.addNotesController = async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      

      // eslint-disable-next-line no-undef
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }

//Controller 3: Update the  existing notes  Using Put: "/api/notes/updatenotes".  login required

exports.updateNotesController = async(req, res) => {
    const{title, description, tag } = req.body;

  try {
      
  
    //create new note object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){ newNote.description = description};
    if(tag){ newNote.tag = tag};


    //find the note to be updated and update it

    let note =  await Note.findById(req.params.id);
    if (!note){return res.status(404).send("not found")}

    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed");}

      note = await Note.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true});  

      res.json({note});

  } catch (error) {

      console.error(error.message);
    res.status(500).send("internal server error");
      
  }

    
}

//Controller 4: Delete the  existing notes  Using Delete: "/api/notes/deletenotes".  login required

exports.deleteNotesController = async(req, res) => {
    
try {
        
//find the note to be delete and delete it

    let note =  await Note.findById(req.params.id);
    if (!note){return res.status(404).send("not found")}
// allow deletion only if the user owns the note
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed");}

      note = await Note.findByIdAndDelete(req.params.id);  

      res.json({"success" : "this note is successfully deleted", note: note});

    } catch (error) {  

        console.error(error.message);
      res.status(500).send("internal server error");
        
    }

    
}
