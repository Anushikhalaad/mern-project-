import React, {useState}  from 'react';
// import { useNavigate } from 'react-router-dom';
import {Link, useNavigate} from "react-router-dom";

const Login = () => {
    const[credentials, setCredentials] = useState({email:'', password:''})
    let navigate = useNavigate();
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST', 
            
            headers: {
              "Content-Type": "application/json"
             
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}), 
              
          });
        const json = await response.json()
        console.log(json)
        if(json.success){
            // save the auth-token and redirect to the notes page
            localStorage.setItem('token' ,json.authtoken);
            navigate("/home");

        }
        else{
            
            alert("invalid credintials")
        }

    }
    const onChange =(e)=> {
    
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div>
       <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
      <div className="container-fluid" style={{justifyContent: 'center'}}>
        <Link className="navbar-brand" to="/">
          Login
        </Link>
        </div>
        <Link className="btn btn-primary mx-1" to="/signup" role="button">SignUp</Link>
       
        </nav>
    <div >
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default Login;
