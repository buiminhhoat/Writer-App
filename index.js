const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const fileSaver = require('file-saver');
const cheerio = require('cheerio');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const publicDirectory = path.join(__dirname, './');
const upload = multer({ dest: 'uploads/' });

require('dotenv').config();

const router = require("./routes/home.js");

const PORT = 6903;
app.listen(6903, () => console.log(`Server is listening on port: ${PORT}`));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(publicDirectory));
app.use(cookieParser());

app.set('view engine', 'hbs');
app.set('view engine', 'ejs');
const session = require('express-session');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(
    session({
        secret: 'buiminhhoat',
        cookie: {MAX_AGE_TOKEN: 60000000},
        resave: false,
        saveUninitialized: true
    }),
);

app.use('/', router);
