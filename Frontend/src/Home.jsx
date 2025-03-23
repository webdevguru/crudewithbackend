import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/employees")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      axios.delete(`/api/employees/${id}`)
        .then(() => {
          alert("Employee deleted successfully!");
          setData(data.filter(emp => emp.id !== id));
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
      <div className="w-75 bg-white shadow-lg rounded p-4">
        <h2 className="text-center mb-4">Employee List</h2>
        <div className="d-flex justify-content-end">
          <Link to="/create" className="btn btn-success">Create+</Link>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover text-center">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map(employee => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>${employee.salary}</td>
                    <td className="d-flex justify-content-center gap-2">
                      <Link to={`/Read/${employee.id}`} className="btn btn-primary btn-sm">Read</Link>
                      <Link to={`/edit/${employee.id}`} className="btn btn-warning btn-sm">Edit</Link>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(employee.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-muted">No employees found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
