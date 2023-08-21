import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{
  const host="http://localhost:5000";

    // const s1={
    //     "name":"harry",
    //     "class":"5b"
    // }
    // const [state,setState]=useState(s1);
    // const update=()=>{
    //     setTimeout(() => {
    //         setState({
    //             "name":"larry",
    //             "class":"10b"
    //         })
    //     }, 1000);
    // }

    const notesInitial=[]


     const [notes,setNotes] =useState(notesInitial)

 // Get all notes
 const getNotes=async ()=>{

  // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      }
     });


// client side
const json=await response.json()
      setNotes(json)
        
}

    
    // Add a note
     const addNote=async (title,description,tag)=>{

          // API call
            const response = await fetch(`${host}/api/notes/addnote`, {
              method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
              },
              body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
            });
            const note=await response.json();
            setNotes(notes.concat(note))
        }
    
      // Edit notes
      const editNote= async (id,title,description,tag)=>{
        // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
         headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
        });

        const json=await response.json();
        console.log(json)

        let newNotes=JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
          for (let i = 0; i < newNotes.length; i++) {
            const element = newNotes[i];
            if(element._id===id){
              newNotes[i].title=title;
              newNotes[i].description=description;
              newNotes[i].tag=tag;
              break;
            }
           
          }
          setNotes(newNotes);
      }

      // Delete a note
      const deleteNote=async (id)=>{

        // API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE", // *GET, POST, PUT, DELETE, etc.
         headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          }
        });
        const json=response.json()
        console.log(json)


        // clientside
          const newNotes=notes.filter((note)=>{return note._id!==id})
            setNotes(newNotes)
        }
    
    
     return (
        // Whatever u wrap in this context provider...automatically all the children will be brought into it
        // <NoteContext.Provider value={{state:state,update:update}}>
        <NoteContext.Provider value={{notes,addNote,editNote,deleteNote,getNotes}}>
         
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;