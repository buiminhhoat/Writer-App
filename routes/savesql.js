const fs = require('fs');
const path = require('path');
const multer = require('multer');
const db = require('../database/database');
const express = require('express');
const { verify } = require('jsonwebtoken');

module.exports = function savesql(req, res) {
    const tokenKey = req.session.tokenKey;
    console.log(tokenKey);
    if (tokenKey) {
        const email = verify(tokenKey,'secret').email;
        console.log(email);
    }
    console.log(req.body.title);
    console.log(req.body.content);
    res.redirect('/');
}