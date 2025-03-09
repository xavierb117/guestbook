import express from 'express';

import mariadb from 'mariadb';

import { validateForm } from './services/validation.js';

import dotenv from 'dotenv';

dotenv.config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

async function connect() {
    try {
        const conn = await pool.getConnection();
        console.log("Connected to the database!");
        return conn;
    } catch (err) {
        console.log(`Error connecting to the database ${err}`);
    }
}

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:true}));

const PORT = process.env.APP_PORT || 3000;

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/submit-guestbook', async (req, res) => {
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

    const conn = await connect();

    if (check.mailing) {
        if (Array.isArray(check.mailing)) {
            check.mailing = check.mailing.join(",");
        }
    } else {
        check.mailing = "";
    }

    const insertQuery = await conn.query(`INSERT INTO contacts 
        (fname, lname, job, company, linkedin, email, meet, other, mailing, message, format) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
        [check.fname, check.lname, check.job, check.company, check.linkedin, check.email, check.meet, check.other, check.mailing, check.message, check.format]);

    res.render('confirmation', {check});
});

app.get('/admin/orders', async (req, res) => {

    const conn = await connect();

    const submission = await conn.query('SELECT * FROM contacts');

    console.log(submission)

    res.render('summary', {submission});
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});