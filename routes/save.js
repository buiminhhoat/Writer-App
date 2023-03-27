const path = require('path');
const fs = require('fs');
const fileSaver = require('file-saver');

module.exports = function save(req, res) {
    let title = req.body.titlesave;
    let content = req.body.contentsave;
    res.status(200).send(OK);
}