import express from 'express';

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
        message: req.body.message,
        format: req.body.format,
        timestamp: new Date()
    };

    if (check.fname.trim() === "" || check.lname.trim() === "" || check.email.trim() === "") {
        res.send("Invalid Input");
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