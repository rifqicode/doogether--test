var express = require('express');
const router = express.Router();
const db = require('../database/database');
const bcrypt = require('bcryptjs');
const dateFormat = require('dateformat');
const jsonwebtoken = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    let { name, email, password, password_confirmation } = req.body;
    
    if (!name || !email || !password || !password_confirmation) {

        console.log('test');
        console.log('validation error');
        res.status(400).send({
            status: 'KO',
            error : 'Kolom nama, email, password, password_confirmation wajib di isi'
        });

        return false;
    }
    
    // email validation
    let ifEmailExist = await db.queryOneRow('SELECT count(1) as count from user WHERE email = (?)', [email]);

    if (ifEmailExist.count > 0) {
        res.status(400).send({
            status: 'KO',
            error : 'Email Sudah Terdaftar'
        });

        return false;
    }

    if (password != password_confirmation) {
        res.status(400).send({
            status: 'KO',
            error : 'Password dan password konfirmasi tidak sama'
        });

        return false;
    }

    password = bcrypt.hashSync(password, 8);
    let now = new Date();
    dateFormat(now, "yyyy-mm-dd");

    let insert = await db.query('INSERT INTO user (name, email, password, created, updated) VALUES (?, ?, ?, ?, ?)', [
        name, email, password, now, now
    ]);

    res.status(200).send({
        status: 'OK',
        message: 'Registrasi berhasil'
    })
});

router.post('/login', async (req, res) => {
    let { email, password } = req.body;
    
    let user = await db.queryOneRow('select id, name, email, password from user where email = ?' , [email]);
    if (!user) {
        res.status(401).send({
            status: 'KO',
            error: 'Email / Password Salah'   
        });

        return false;
    }

    let isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
        res.status(401).send({
          status: 'KO',
          error: 'Email / Password Salah'   
        });
    }

    let now = new Date(),
        id = user.id,
        name = user.name;

    dateFormat(now, "yyyy-mm-dd");

    // create token
    let token = jsonwebtoken.sign({
        id : user.id
      }, 'hiring-backend', {
        expiresIn: '1h'
    });

    res.status(200).send({
        status: 'OK',
        user: name,
        token: token
    });
});

module.exports = router;