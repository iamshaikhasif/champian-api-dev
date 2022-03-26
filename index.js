const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config();
var cors = require('cors');
const app = express();
const hostname = "localhost";
const port = process.env.PORT;

const UserRoutes = require('./routes/User.route');
const StudentRoutes = require('./routes/Student.route');

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Successfully connected to the database"))
    .catch((err) => {
        console.log("Could not connect to the database. Exiting now...", err);
        process.exit();
    });

mongoose.set('debug', function (coll, method, query, doc, options) {
    // console.log("Query executed" ,query);
});


app.get('/', (req, res) => {
    res.send('Hi Buddy!!!')
});
app.use("/user", UserRoutes);
app.use("/student", StudentRoutes);


app.listen(port, () => {
    console.log(`Listening on port ${hostname}:${port}!`)
});
