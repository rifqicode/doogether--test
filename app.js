const express = require('express')
const app = express()
const port = 3000
const db = require('./database/database');
const bcrypt = require('bcryptjs');
const dateFormat = require('dateformat');
const jsonwebtoken = require('jsonwebtoken');

// routes
let auth = require('./routes/auth');
let session = require('./routes/session');

app.use(express.json());

app.use('/auth', auth);
app.use('/session', session);

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'REST API AUTH'
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})