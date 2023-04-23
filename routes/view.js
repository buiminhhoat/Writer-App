const express = require('express');
const router = express.Router();
const db = require('../database/database');
const jwt = require('jsonwebtoken');

const { saveToken } = require('../public/js/authentication');
const {verify} = require("jsonwebtoken");

function view(req, res) {
    const token = req.body.token;
    console.log(token);
    const email = verify(token,'secret').email;
    console.log(email);
    let user_id;

    db.query('SELECT * FROM user WHERE email = ?', [email], async (error, result)=>
    {
        if(error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if(result.length <= 0)
        {
            return res.status(401).send({ message_login:'Email không tồn tại' });
        }
        user_id = result[0].user_id.toString();
        console.log(user_id);
        let posts = [];
        db.query('SELECT * FROM post WHERE user_id = ?', [user_id], async (error, result)=>
        {
            if(error) {
                console.log(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            for (let i = 0; i < result.length; ++i) {
                posts.push({
                    title: result[i].title,
                    content: result[i].content,
                    date_modified: result[i].date_modified});
            }

            res.send({posts: posts});
            // const jsonObject = {email:email, user_id:result[0].user_id};
            //
            // const token = jwt.sign(jsonObject,'secret',{expiresIn: 8640});
            //
            // req.session.token = token;
            // res.send({ token, message_login: "Đăng nhập thành công" });
        });
    });
}

module.exports = {view};
