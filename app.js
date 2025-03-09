import express from 'express';

// import mariadb from 'mariadb';

import { validateForm } from './services/validation.js';

// import dotenv from 'dotenv';

// dotenv.config();

// const pool = mariadb.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT
// });

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:true}));

const PORT = 3000;

const submission = [];

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/submit-guestbook', (req, res) => {
    let check = {
        fname: req.body.fname,
        lname: req.body.lname,
        job: req.body.job,
        company: req.body.company,
        linkedin: req.body.linkedin,
        email: req.body.email,
        meet: req.body.meet,
        other: req.body.other,
        mailing: req.body.mailing,
        message: req.body.message,
        format: req.body.format,
        timestamp: new Date()
    };

    // This is commented out as this code will be included in the validation file
    // if (check.fname.trim() === "" || check.lname.trim() === "" || check.email.trim() === "") {
    //     res.send("Invalid Input");
    //     return;
    // }

    console.log(check);
    
    const result = validateForm(check);
    if (!result.isValid) {
        console.log(result.errors);
        res.send(result.errors);
        return;
    }

    submission.push(check);
    console.log(check);
    res.render('confirmation', {check});
});

app.get('/admin/orders', (req, res) => {
    res.render('summary', {submission});
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});