const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const fileSaver = require('file-saver');
const cheerio = require('cheerio');

const publicDircetory = path.join(__dirname, './public');

const PORT = 6903;
app.listen(6903, () => console.log(`Server is listening on port: ${PORT}`));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(publicDircetory));
app.set('view engine', 'hbs');
app.set('view engine', 'ejs');
const session = require('express-session');

app.use(
    session({
        secret: 'padv',
        cookie: {maxAge: 60000000},
    }),
);

app.get('/', (req, res) => {
    res.render("./ejs/index.ejs");
});

app.post('/download', (req, res) => {
    let content = req.body.content;
    console.log(content);

    // const $ = cheerio.load(content);
    // content = $.text();

    // Tạo một Blob mới với nội dung của biến "content" và loại tệp tin là "text/plain".
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });

    // Lưu nội dung vào tệp tin text trên máy chủ
    const filePath = path.join(__dirname, 'file.txt');
    fs.writeFile(filePath, content, err => {
        if (err) {
            console.error(err);
            res.status(500).send('Lỗi khi lưu tệp tin');
        } else {
            // Trả về tệp tin cho người dùng để tải xuống
            res.download(filePath, 'file.txt');
        }
    });

    fileSaver.saveAs(blob, "file.txt");
});