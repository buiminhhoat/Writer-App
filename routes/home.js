const express = require("express");
const router = express.Router();
module.exports = router;

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', (req, res) => {
    res.render('./ejs/home.ejs');
})

router.get('/create', (req, res) => {
    let content = '';
    if (req.session.content !== "") {
        content = req.session.content;
        req.session.content = "";
    }
    let id = "";
    if (typeof req.query.id !== 'undefined') {
        id = req.query.id;
    }
    res.render("./ejs/index.ejs", { content, id });
})

router.post('/download', require('./download.js'));

router.post('/upload', upload.single('htmlfile'), require('./upload.js'));

router.post('/downloadFileWord', require('./downloadFileWord.js'));

router.get('/login', require('./login.js'));
