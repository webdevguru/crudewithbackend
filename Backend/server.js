import cors from 'cors';
import express from 'express';
import mysql from 'mysql';

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'emptable',
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL Database');
    }
});

//  Fetch All Employees
app.get('/employees', (req, res) => {
    db.query('SELECT * FROM emp', (err, result) => {
        if (err) return res.status(500).json({ error: err });
        return res.json(result);
    });
});

//  Fetch Single Employee (Read by ID)
app.get('/employees/:id', (req, res) => {
    db.query('SELECT * FROM emp WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        return res.json(result[0]);
    });
});

// Insert Employee
app.post('/employees', (req, res) => {
    const { name, email, salary } = req.body;
    db.query('INSERT INTO emp (name, email, salary) VALUES (?, ?, ?)', [name, email, salary], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        return res.json({ message: "Employee added successfully", result });
    });
});

// Update Employee
app.put('/employees/:id', (req, res) => {
    const { name, email, salary } = req.body;
    db.query('UPDATE emp SET name = ?, email = ?, salary = ? WHERE id = ?', [name, email, salary, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        return res.json({ message: "Employee updated successfully", result });
    });
});

// Delete Employee
app.delete('/employees/:id', (req, res) => {
    db.query('DELETE FROM emp WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        return res.json({ message: "Employee deleted successfully", result });
    });
});

// Start Server
app.listen(3001, () => console.log('Server is running on port 3001'));
