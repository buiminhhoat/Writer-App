const express = require("express");
const router = express.Router();
module.exports = router;

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', (req, res) => {
    res.render('./ejs/home.ejs');
})

router.post('/api/', require('./view').view);
router.get('/create', (req, res) => {
    let content= "";
    let post_id= "";
    let title = "";
    if (typeof req.query.post_id !== 'undefined') {
        post_id  = req.query.post_id;
        content = req.query.content;
        title = req.query.title;
    }
    res.render("./ejs/index.ejs", { content, post_id, title });
})

router.post('/api/create', require('./view').create);

router.post('/api/download', require('./download.js'));

router.post('/upload', upload.single('htmlfile'), require('./upload.js'));

router.post('/api/downloadFileWord', require('./downloadFileWord.js'));

router.post('/savesql', require('./savesql.js'));

router.get('/login', (req, res) => {
    res.render("./hbs/login.hbs");
});

router.post('/api/login', require('./authentication').login);

router.get('/api/logout',  require('./authentication').logout);

router.get('/register', (req, res) => {
    res.render("./hbs/register.hbs");
});

router.post('/api/register', require('./authentication').register);