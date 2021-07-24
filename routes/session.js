var express = require('express');
const router = express.Router();
const db = require('../database/database');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const dateFormat = require('dateformat');

// list session
router.get('/list', jwtMiddleware, async (req, res) => {
    let parameter = req.query;
    let userId = req.userId;

    let query = `
        SELECT b.name, b.email, a.* FROM session a INNER JOIN user b on b.id = a.userID WHERE 1 = 1
    `;

    if (parameter.user) {
        query += ` AND userID = ${parameter.user}`;
    }

    if (parameter.keyword) {
        query += ` AND lower(description) = lower('${parameter.keyword}')`;
    }

    if (parameter.durasi) {
        query += ` AND duration = ${parameter.durasi}`;
    }

    if (parameter.order) {
        query += ` ORDER BY created ${parameter.order}`;
    }

    let data = await db.query(query);
    res.status(200).send({
        status: 'OK',
        data: data
    })
});

// detail session
router.get('/detail/:id', jwtMiddleware, async (req, res) => {
    let parameter = req.params;

    let data = await db.query(`SELECT * FROM session WHERE id = ${parameter.id}`);
    res.status(200).send({
        status: 'OK',
        message: (data) ? 'Data tersedia' : 'Data tidak ditemukan',
        data: data
    })
});

// craete session
router.post('/create', jwtMiddleware, async (req, res) => {
    let userId = req.userId;
    let { name, description, start, duration } = req.body;

    if (!sessionValidation(req.body)) {
        res.status(400).send({
            status: 'KO',
            message: 'Name, Description, Start, Duration tidak boleh kosong'
        });

        return false;
    }

    let now = new Date();
    dateFormat(now, "yyyy-mm-dd");

    // create session
    await db.query('INSERT INTO session (userID, name, description, start, duration, created, updated) VALUE (?, ?, ?, ?, ?, ?, ?)', [
       userId, name, description, start, duration, now, now
    ]);

    res.status(200).send({
        status: 'OK',
        message: 'session berhasil dibuat'
    })
}); 

// craete session
router.post('/update/:id', jwtMiddleware, async (req, res) => {
    let userID = req.userID;
    let sessionId = req.params.id;
    let { name, description, start, duration } = req.body;

    if (!sessionValidation(req.body)) {
        res.status(400).send({
            status: 'KO',
            message: 'Name, Description, Start, Duration tidak boleh kosong'
        });

        return false;
    }

    // get data by id 
    let findData = await db.queryOneRow(`SELECT * FROM session WHERE id = ${sessionId}`);
    if (findData.userID != userID) {
        return res.status(401).send({
            status: 'KO',
            message: 'Data yang ingin diedit tidak dibuat oleh user yang sama'
        });
    }

    let now = new Date();
    dateFormat(now, "yyyy-mm-dd");

    // create session
    await db.query(`
        UPDATE session
        SET name = '${name}',
            description = '${description}',
            start = '${start}',
            duration = '${duration}',
            updated = now()
        WHERE 
            id = ${sessionId}
    `);

    res.status(200).send({
        status: 'OK',
        message: 'session berhasil diupdate'
    });
}); 

// craete session
router.post('/delete/:id', jwtMiddleware, async (req, res) => {
    let userID = req.userID;
    let sessionId = req.params.id;

    let findData = await db.queryOneRow(`SELECT * FROM session WHERE id = ${sessionId}`);
    if (findData.userID != userID) {
        return res.status(401).send({
            status: 'KO',
            message: 'tidak memiliki akses untuk data yg dihapus'
        });
    }

    // create session
    await db.query(`
        DELETE FROM session
        WHERE 
            id = ${sessionId}
    `);

    res.status(200).send({
        status: 'OK',
        message: 'session berhasil dihapus'
    });
}); 


function sessionValidation(data) {
    console.log(data);
    if (!data.name || !data.description || !data.start || !data.duration) {
        return false;
    }

    return true;
} 

module.exports = router;