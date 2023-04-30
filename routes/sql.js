const fs = require('fs');
const path = require('path');
const multer = require('multer');
const db = require('../database/database');
const express = require('express');
const { verify } = require('jsonwebtoken');
const jwt = require("jsonwebtoken");

function save_post(req, res) {
    const token = req.cookies['token'];
    const post_id = req.body.post_id;
    const content = req.body.content;
    const title = req.body.title;
    // console.log(title + " " + content + " " + token);
    if (token) {
        const email = verify(token,'secret').email;
        db.query('SELECT * FROM user WHERE email = ?', [email], async (error,result)=>
        {
            if(error) {
                console.log(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if(result.length <= 0)
            {
                return res.status(401).send({ message:'Email không tồn tại' });
            }

            const user_id = result[0].user_id;
            if (post_id) {
                db.query('UPDATE post SET content = ?, title = ?, date_modified = ? WHERE post_id = ?',
                    [content, title, new Date(), post_id], function(err, results) {
                    if (err) throw err;
                    res.send({ message: "Sửa bài thành công" });
                });
            }
            else {
                db.query('INSERT INTO post SET ?', {user_id: user_id, content:content, title:title, date_modified: new Date()});
                res.send({ message: "Lưu bài thành công" });
            }
        });
    }
}

function delete_post(req, res) {

}
module.exports = {save_post, delete_post};