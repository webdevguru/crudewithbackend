import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [formData, setFormData] = useState({ name: '', email: '', salary: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/employees', formData)
            .then(() => {
                alert('Employee added successfully!');
                navigate('/');
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
            <div className="w-50 bg-white shadow-lg rounded p-4">
                <h2 className="text-center mb-4">Add Employee</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Name" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email" />
                    <input type="number" name="salary" value={formData.salary} onChange={handleChange} required placeholder="Salary" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Create;
