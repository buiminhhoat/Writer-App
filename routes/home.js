const express = require("express");
const router = express.Router();
module.exports = router;

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', (req, res) => {
    res.render('./ejs/home.ejs');
})

router.get('/create', (req, res) => {
    const content = req.session.content || '';
    req.session.content = "";
    res.render("./ejs/index.ejs", { content });
})

router.post('/download', require('./download.js'));

router.post('/upload', upload.single('htmlfile'), require('./upload.js'));

router.post('/downloadFileWord', require('./downloadFileWord.js'));