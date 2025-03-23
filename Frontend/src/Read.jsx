import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function Read() {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        axios.get(`/api/employees/${id}`)
            .then(res => setEmployee(res.data))
            .catch(err => console.error(err));
    }, [id]);

    return employee ? (
        <div>
            <h2>{employee.name}</h2>
            <p>Email: {employee.email}</p>
            <p>Salary: ${employee.salary}</p>
            <Link to="/">Back</Link>
        </div>
    ) : <p>Loading...</p>;
}

export default Read;
