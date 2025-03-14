import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Create() {
  const [values , setValues]= useState({
      name: '',
      age: ''
  }) 
  const navigate = useNavigate();
  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:8081/alpha', values)
    .then(res =>{ console.log(res); 
      navigate('/');
    })
    .catch(err=>{ console.log(err);})
  };
  return (
    <>
    <div className= 'shadow-bg'><button> <Link to = '/'>BACK</Link></button> </div>
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
  <div className="bg-white rounded p-3">
    <form onSubmit={handleSubmit}>
      <h2>Add Student</h2>
      <div className="mb-2">
        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          id="name" 
          placeholder="Enter Name" 
          className="form-control"
          onChange={e => setValues({...values , name: e.target.value})} 
        />
      </div>
      
      <div className="mb-2">
        <label htmlFor="age">Age</label>
        <input 
          type="int" 
          id="age" 
          placeholder="Enter Age" 
          className="form-control" 
          onChange={e => setValues({...values , age: e.target.value})}
        />
      </div>
      <button type="submit" className="btn btn-success">
        Submit
      </button>
    </form>
  </div>
</div>

    </>
  )
}
