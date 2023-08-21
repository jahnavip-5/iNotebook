import React, { useState, useContext  } from 'react'
import noteContext from '../context/notes/noteContext';



const AddNote = (props) => {
  
  const context=useContext(noteContext);
  const {addNote}=context;

  const [note,setNote]=useState({title:"",description:"",tag:""})

  const handleclick=(e)=>{
    // so that page doesn't reload
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    // To clear form after adding
    setNote({title:"",description:"",tag:""})
    
    props.showAlert("Added Successfully","success");
  }

  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
    //         1^            2^            3 ^
    //1 Jo bhi hai phle se hai wo same rahega
    // 2 e.target.name i.e title/description whereever u r typng
    // 3  2 will have the typed value
  }
  return (
    <div>
      <div className="container my-5">
      <h2>Add a note</h2>
                    <form className='my-5'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title </label>
                  <input type="text" className="form-control" value={note.title} id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={1} required/>
                 
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" value={note.description} id="description" name="description" onChange={onChange} minLength={1} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" value={note.tag} id="tag" name="tag" onChange={onChange}/>
                </div>
                
                <button disabled={note.title.length<1 || note.description.length<1} type="submit" className="btn btn-primary" onClick={handleclick}>Add note</button>
              </form>

      </div>
    </div>
  )
}

export default AddNote
