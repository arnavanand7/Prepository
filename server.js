const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const University = require('./University');
mongoose.connect('mongodb://localhost/prepository', { useNewUrlParser: true });

mongoose.connection.once('open', () => {
    console.log("connected to mongodb");
}).on('error', (err) => {
    console.log('connection error:', err)
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.post('/getuniversities', (req, res) => {
    const regex = new RegExp(escapeRegex(req.body.keyword), 'gi');
    University.find({ 'name': regex }, (err, documents) => {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).json(documents);
        }
    })

})
app.post('/getgre', (req, res) => {
    console.log(req.body.searchGre)
    const greScore = Number(req.body.keyword);
    University.find({ 'gre': { $lte: greScore } }, null, { limit: 30 }, (err, documents) => {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).json(documents);
        }
    })

})

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


app.listen(4000, () => {
    console.log('Listening at port 4000');
});

