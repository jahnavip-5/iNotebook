import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

   const[credentials,setCredentials]= useState({email:"",password:""})
   let navigate=useNavigate();
    
  const host="http://localhost:5000";
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
              "Content-Type": "application/json",
            //   "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkZjFlZjY4YWRiZmNmNDg1M2Q4Y2NlIn0sImlhdCI6MTY5MjQxNzU1OH0.HQ2g1LPTVNDRpyqeNXFKL_6fhEhirwviF0YHEFupAMs"
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
           });
           const json=await response.json()
           console.log(json)
           if(json.success){
            //Save the authtoken redirect
            localStorage.setItem('token',json.authtoken)
            // navigate to home page if credentials are valid
            props.showAlert("Logged-in Successfully","success")
            navigate("/")
           }else{
            props.showAlert("Invalid Credentials","danger")
           }
    }

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
        //         1^            2^            3 ^
        //1 Jo bhi hai phle se hai wo same rahega
        // 2 e.target.name i.e title/description whereever u r typng
        // 3  2 will have the typed value
      }
  return (
    <div className='mt-3'  >
        <h2 className="mb-3 " >Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email"  className="form-label">Email address</label>
    <input  type="email"  className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp"   className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input  type="password" value={credentials.password} className="form-control" id="password" name="password" onChange={onChange}/>
  </div>
  
  <button type="submit" className="btn btn-primary " >Submit</button>
</form>
    </div>
  )
}

export default Login
