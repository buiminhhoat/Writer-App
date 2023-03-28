const path = require('path');
const fs = require('fs');

module.exports = function download(req, res) {
    let content = req.body.content;
    console.log(content);

    const filePath = path.join(__dirname, 'file.html');
    fs.writeFile(filePath, content, err => {
        if (err) {
            console.error(err);
            res.status(500).send('Lỗi khi lưu tệp tin');
        } else {
            res.download(filePath, 'file.html', (err) => {
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