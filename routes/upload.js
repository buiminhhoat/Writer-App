const fs = require('fs');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

module.exports = function upload(req, res) {
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
}