import { Console } from 'console';
import express from 'express';

const app = express();

app.get('/api', (req, res) => {
    res.send('Hello it is DSA!');
});

app.listen(5000, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log("Server is ok");
});

