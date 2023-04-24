const path = require('path');
const fs = require('fs');

module.exports = function download(req, res) {
    let title = req.body.title;
    let content = req.body.content;
    let nameFile = title + '.html';
    const filePath = path.join(__dirname, nameFile);
    fs.writeFile(filePath, content, err => {
        if (err) {
            console.error(err);
            res.status(500).send('Lỗi khi lưu tệp tin');
        } else {
            res.download(filePath, nameFile, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                }
            });
        }
    });
};