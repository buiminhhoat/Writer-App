const express = require("express");
const router = express.Router();
module.exports = router;

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', (req, res) => {
    res.render('./ejs/home.ejs');
})

router.get('/create', (req, res) => {
    const content = req.session.content || ''; // Lấy dữ liệu từ session, nếu không có thì gán giá trị rỗng
    req.session.content = "";
    res.render("./ejs/index.ejs", { content });
})

// router.get('/', (req, res) => {
//     const content = req.session.content || ''; // Lấy dữ liệu từ session, nếu không có thì gán giá trị rỗng
//     res.render("./ejs/index.ejs", { content });
// });

router.post('/download', require('./download.js'));

router.post('/upload', upload.single('htmlfile'), require('./upload.js'));

router.post('/downloadFileWord', require('./downloadFileWord.js'));