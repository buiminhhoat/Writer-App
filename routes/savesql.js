const fs = require('fs');
const path = require('path');
const multer = require('multer');
const db = require('../database/database');
const express = require('express');
const { verify } = require('jsonwebtoken');
const jwt = require("jsonwebtoken");

module.exports = function savesql(req, res) {
    const token = req.body.token;
    const content = req.body.content;
    const title = req.body.title;
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
            db.query('INSERT INTO post SET ?', {user_id: user_id, content:content, title:title});
            res.send({ token, message: "Lưu bài thành công" });
        });
    }
}