const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');

const dbconfig = require('./util/dbconfig');
const singin = require('./router/singin');

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "view")));

app.use('/user', singin);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "view", "login.html"));
});

dbconfig.sync();
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
