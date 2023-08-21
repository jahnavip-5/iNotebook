import React, { useContext, useEffect,useRef ,useState} from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  let navigate=useNavigate();
  const context=useContext(noteContext);
  const {notes,getNotes,editNote}=context;
  useEffect(()=>{
    if(localStorage.getItem('token')){
      getNotes();// eslint-disable-next-line
    }else{
      navigate('/login')// eslint-disable-next-line
    }
  },[])
  // ^only once

  
  const ref=useRef(null)
  
  const refClose=useRef(null)
  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:"default"})

  const handleclick=(e)=>{
    // so that page doesn't reload
    e.preventDefault();
    editNote(note.id,note.etitle,note.edescription,note.etag)
    // addNote(note.title,note.description,note.tag);
    refClose.current.click();
     props.showAlert("Updated Successfully","success");
  }

  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
    //         1^            2^            3 ^
    //1 Jo bhi hai phle se hai wo same rahega
    // 2 e.target.name i.e title/description whereever u r typng
    // 3  2 will have the typed value
  }

  const updateNote=(currentNote)=>{
    ref.current.click();
    // so that when edit window opens previously stored info is displayed
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
   
  }

  return (
    <>
     <AddNote showAlert={props.showAlert}/>

            {/* <!-- Button trigger modal --> */}
        <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>

        {/* <!-- Modal --> */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                
              {/* Update form */}
              <form className='my-5'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title </label>
                  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} value={note.etitle} minLength={1} required/>
                 
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} minLength={1} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag}/>
                </div>
                
                </form>


              </div>
              <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button disabled={note.etitle.length<1 || note.edescription.length<1} onClick={handleclick} type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>


        <div className="row my-3">
            <h2>Your Notes</h2>
            <div className="container text-center">

            {notes.length===0 && "Awaiting notes for display!"}
            </div>
            {notes.map((note)=>{
              return <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
            })}
        </div>
        </>
  )
}

export default Notes
