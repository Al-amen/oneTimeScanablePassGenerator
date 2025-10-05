import React, { useState } from 'react'
import api from '../api';
import { useNavigate } from 'react-router';

const RegisterPage = () => {
    const [formData,setFormData] = useState({
        roll_number:'',
        name:'',
        email:''
    })
    
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    const  handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
        api.post('registration/',formData)
        .then(res => {
            console.log(res.data);
            alert('Registration Successful');
            setFormData({
                roll_number:'',
                name:'',
                email:''
            });
            navigate('/pending/');

        })
        .catch(err => {
            console.log(err);
            alert('Registration Failed');
        })
    }
  return (
    <div className="container mt-5">
        <h2 className='text-center mb-3'>Registration Form</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Roll Number</label>
          <input type="text" className="form-control" id="exampleInputEmail1" name="roll_number" aria-describedby="emailHelp" value={formData.roll_number} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
          <input type="text" className="form-control" id="exampleInputEmail1" name="name" aria-describedby="emailHelp" value={formData.name} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
          <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" value={formData.email} onChange={handleChange} />
        </div>
         
       
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </div>
  )
}

export default RegisterPage
   
