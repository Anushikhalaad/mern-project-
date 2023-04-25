import NoteContext from "./NoteContext";
import { useState } from "react";




 const NoteState = (props) =>{

  const host= "http://localhost:5000"


    const notesInitial = []
     
    const[notes, setNotes]=useState(notesInitial)


    // get all notes
      
    //Add a Note
    const getNote = async ()=>{
      //APi call 
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET", 
        
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
          
      });
      const json = await response.json();
      console.log(json);
      console.log("",json)
      setNotes(json)
     }

    //Add a Note
     const addNote = async (title, description, tag)=>{
      //APi call 
      // console.log("body...",JSON.stringify(title,description,tag))
      const response = await fetch(`${host}/api/notes/addnotes`,{
        method: "POST", 
        
        headers: {
          "Content-Type": 'application/json',
          'Accept': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        
        body: JSON.stringify({title, description, tag}), 
      });
      const json = await response.json();
      console.log("JSON",json)
      console.log("adding a new note");
      //  const note = {
      //   "_id": "anushikha",
      //   "user": "64251da03f3972a4c33cf537",
      //   "title": title,
      //   "description": description,
      //   "tag": tag,
      //   "timestamp": "2023-03-17T09:54:04.118Z",
      //   "__v": 0
      // }; 
      setNotes(notes.concat(json));
     }


    //Delete a Note
    const deleteNote =async (id)=>{
      //TODO call an Api
      
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
          method: "DELETE", 
          
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
           
        });
        const json =  await response.json();
        console.log(json)
      //deleting logic
      console.log("deleting the note with id" + id)
       const newNote = notes.filter((note)=>{return note._id!==id});
       setNotes(newNote)
    }



    //Update a Note
    const editNote = async (id, title, description, tag)=>{
      // api  call
      const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
        method: "PUT", 
        
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
         
        body: JSON.stringify({title, description, tag}), 
      });
      const json = await response.json();
      console.log(json); 
    
      let newNotes = JSON.parse(JSON.stringify(notes))
      // logic to edit client
      for (let index = 0; index < notes.length; index++) {
        const element = newNotes[index];
        if(element.id === id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
        
      }
      setNotes(newNotes);
    }
    


    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNote}}>
         
         {props.children}

        </NoteContext.Provider>
    )

}


export default NoteState;