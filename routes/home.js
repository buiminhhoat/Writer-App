const express = require("express");
const router = express.Router();
module.exports = router;

const multer = require('multer');
const {verify} = require("jsonwebtoken");
const upload = multer({ dest: 'uploads/' });

function requireLogin(req, res, next) {
    const token = req.cookies['token'];
    if (token === undefined) {
        res.redirect('/login');
        return;
    }
    try {
        const email = verify(token, process.env.TOKEN_SECRET).email;
        if (email === "") {
            res.redirect('/login');
        } else {
            next();
        }
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            // handle the TokenExpiredError here
            res.redirect('/login');
        } else {
            // handle other errors here
            console.error(error);
        }
    }

}


router.get('/', async (req, res) => {
    res.render('./ejs/home.ejs');
})

router.post('/api/', require('./view').view);
router.get('/create', requireLogin, (req, res) => {
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

router.post('/api/create', requireLogin, require('./view').create);

router.post('/api/download', requireLogin, require('./download.js'));

router.post('/upload', requireLogin, upload.single('htmlfile'), require('./upload.js'));

router.post('/api/downloadFileWord', requireLogin, require('./downloadFileWord.js'));

router.post('/api/refresh_token', requireLogin, require('./refresh_token').refresh_token);

router.post('/savesql', requireLogin, require('./savesql.js'));

router.get('/login', (req, res) => {
    res.render("./hbs/login.hbs");
});

router.post('/api/login', require('./authentication').login);

router.get('/api/logout', require('./authentication').logout);

router.get('/register', (req, res) => {
    res.render("./hbs/register.hbs");
});

router.post('/api/register', require('./authentication').register);