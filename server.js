const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const University = require('./University');
mongoose.connect('mongodb+srv://prep:admin@cluster0.qess7.mongodb.net/prepository?retryWrites=true&w=majority', { useNewUrlParser: true });


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
    console.log(req.body.keyword)
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

app.post('/gettop', (req, res) => {
    const topUniversities = [
        'Massachusetts Institute of Technology',
        'Stanford University',
        'California Institute of Technology',
        'University of Oxford',
        'Imperial College London',
        'University of Chicago',
        'University College London',
        'Princeton University',
        'University of Pennsylvania',
        'Cornell University',
        'University of Michigan Ann Arbor'
    ]

    let results = [];

    University.find({ 'name': { $in: topUniversities } }, (err, document) => {
        if (err) {
            console.log(err)
        } else {
            results.push(document[9]);
            results.push(document[8]);
            results.push(document[6]);
            results.push(document[3]);
            results.push(document[1]);
            results.push(document[2]);
            results.push(document[5]);
            results.push(document[10]);
            results.push(document[7]);
            results.push(document[0]);
            results.push(document[4]);
            res.status(200).json(results);
        }
    })
})

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


app.listen(process.env.PORT || 4000, () => {
    console.log('Listening at port 4000');
});





