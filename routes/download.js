const path = require('path');
const fs = require('fs');
const fileSaver = require('file-saver');

module.exports = function download(req, res) {
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
};