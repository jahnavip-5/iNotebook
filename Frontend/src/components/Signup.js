import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const[credentials,setCredentials]= useState({name:"",email:"",password:"",cpassword:""})
   
   
   let navigate=useNavigate();

   const host="http://localhost:5000";
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const {name,email,password}=credentials;
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
              "Content-Type": "application/json",
            //   "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkZjFlZjY4YWRiZmNmNDg1M2Q4Y2NlIn0sImlhdCI6MTY5MjQxNzU1OH0.HQ2g1LPTVNDRpyqeNXFKL_6fhEhirwviF0YHEFupAMs"
            },
            body:JSON.stringify({name,email,password})
           });
           const json=await response.json()
           console.log(json)
           if(json.success){
           //Save the authtoken and redirect
            localStorage.setItem('token',json.authtoken)
            // navigate to home page if credentials are valid
            navigate("/")
            props.showAlert("Account created successfully","success")
           }else {
            props.showAlert("Invalid details","danger")
           }
           
    }

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
        
    }

    


  return (
    <div className='container mt-2'>
        
        <h2 className="mb-3">Signup to create a new account</h2>
            <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" required minLength={3} className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" name="email" className="form-control" id="email"  onChange={onChange} aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" name="password" className="form-control" id="password" onChange={onChange} required minLength={5} />
        </div>
        <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" name="cpassword"className="form-control" id="cpassword" onChange={onChange} required minLength={5}/>
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Signup
