const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const fileSaver = require('file-saver');
const cheerio = require('cheerio');
const multer = require('multer');

const publicDirectory = path.join(__dirname, './');
const upload = multer({ dest: 'uploads/' });

const PORT = 6903;
app.listen(6903, () => console.log(`Server is listening on port: ${PORT}`));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(publicDirectory));
app.set('view engine', 'hbs');
app.set('view engine', 'ejs');
const session = require('express-session');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(
    session({
        secret: 'buiminhhoat',
        cookie: {maxAge: 60000000},
        resave: false,
        saveUninitialized: true
    }),
);

app.get('/', (req, res) => {
    const content = req.session.content || ''; // Lấy dữ liệu từ session, nếu không có thì gán giá trị rỗng
    res.render("./ejs/index.ejs", { content });
});

app.post('/download', (req, res) => {
    let content = req.body.content;
    console.log(content);

    const filePath = path.join(__dirname, 'file.html');
    fs.writeFile(filePath, content, err => {
        if (err) {
            console.error(err);
            res.status(500).send('Lỗi khi lưu tệp tin');
        } else {
            // Trả về tệp tin cho người dùng để tải xuống
            res.download(filePath, 'file.html');
        }
    });

    fileSaver.saveAs(content, "file.html");
});

app.post('/upload', upload.single('htmlfile'), (req, res) => {
    const file = req.file;
    if (!file) {
        res.status(400).send('No file uploaded');
        return;
    }
    if (file.mimetype !== 'text/html') {
        res.status(400).send('Invalid file type');
        return;
    }
    fs.readFile(file.path, 'utf8', (err, data) => {
        // Xóa file khỏi hệ thống tệp tin
        fs.unlink(file.path, (err) => {
            if (err) {
            console.error(err);
            return;
            }
            console.log(`Deleted file: ${file.path}`);
        });
        
        req.session.content = data;
        res.redirect('/');
    });
});