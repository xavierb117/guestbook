import express from 'express';

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));

const PORT = 3000;

const submission = [];

app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.post('/submit-guestbook', (req, res) => {
    submission.push(req.body);
    console.log(req.body);
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

app.get('/admin/orders', (req, res) => {
    res.send(submission);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});