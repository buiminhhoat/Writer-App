const express = require('express');
const router = express.Router();
const db = require('../database/database');
const jwt = require('jsonwebtoken');

const {verify} = require("jsonwebtoken");

function view(req, res) {
    const token = req.cookies['token'];
    if (token === undefined) {
        res.send({message: "Vui lòng đăng nhập lại"});
        return;
    }
    const email = verify(token, process.env.ACCESS_TOKEN_SECRET).email;
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

        let posts = [];
        db.query('SELECT * FROM post WHERE user_id = ?', [user_id], async (error, result)=>
        {
            if(error) {
                console.log(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            for (let i = 0; i < result.length; ++i) {
                posts.push({
                    post_id: result[i].post_id,
                    title: result[i].title,
                    content: result[i].content,
                    date_modified: result[i].date_modified
                });
            }

            res.send({posts: posts});
        });
    });
}

function create(req, res) {
    let content = '';
    let post_id = "";
    let title = "";
    if (typeof req.query.post_id !== 'undefined') {
        post_id = req.query.post_id;
        const token = req.cookies['token'];
        const email = verify(token, process.env.ACCESS_TOKEN_SECRET).email;
        let user_id;

        db.query('SELECT * FROM user WHERE email = ?', [email], async (error, result)=>
        {
            if(error) {
                console.log(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if(result.length <= 0)
            {
                return res.status(401).send({ message_login:'Token không hợp lệ' });
            }
            user_id = result[0].user_id.toString();

            let posts = [];
            db.query('SELECT * FROM post WHERE post_id = ?', [post_id], async (error, result)=>
            {
                if(error) {
                    console.log(error);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                post_id = result[0].post_id;
                content = result[0].content;
                title = result[0].title;
                res.send({post_id: post_id, title: title, content: content});
            });
        });
    }
}

module.exports = {view, create};
