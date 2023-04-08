// module.exports = function login(req, res) {
//     res.render("./ejs/login.hbs");
// }

const express = require('express');
const router = express.Router();
const db = require('../database/database');
// const hashing = require('../database/hashing');
const jwt = require('jsonwebtoken');
// const Console = require("console");
router.post('/register', (req,res) => {
    const {name, email, password} = req.body;
    db.query('SELECT email FROM user WHERE email = ?', [email], async (error,result) => {
        if(error) console.log(error);
        if(result.length > 0)
            return res.render('../views/hbs/register.hbs',{message_register:'Email đã được sử dụng'});
        const password_hash = password;
        db.query('INSERT INTO user SET ?', {name: name, email:email, password_hash:password_hash});
        return res.render('../views/hbs/register.hbs',{message_register:'Bạn đã đăng kí thành công, hãy đăng nhập'});
    })
});

router.post('/login', (req,res) => {
    const {email, password} = req.body;
    db.query('SELECT * FROM user WHERE email = ?', [email], async (error,result)=>
    {
        if(error) console.log(error);

        console.log(result);

        if(result.length <= 0)
        {
            return res.render('../views/hbs/login.hbs',{message_login:'Email không tồn tại'});
        }
        if(!hashing.compare(password,result[0].passwordHash))
        {
            return res.render('../views/hbs/login.hbs',{message_login:"Sai mật khẩu"});
        }

        if(result[0].isBan == 1)
        {
            return res.render('../views/hbs/login.hbs',{message_login:"Tài khoản của bạn đã bị khóa!"});
        }
        const jsonObject = {email:email, id:result[0].id, isAdmin:result[0].isAdmin};

        const tokenKey = jwt.sign(jsonObject,'secret',{expiresIn: 8640});

        req.session.tokenKey = tokenKey;
        return res.redirect('/myHomePage');
    });
})

module.exports = router;
