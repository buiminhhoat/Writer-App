const fs = require('fs');
const path = require('path');
const multer = require('multer');
const db = require('../database/database');
const express = require('express');
const { verify } = require('jsonwebtoken');

module.exports = function savesql(req, res) {
    const token = req.body.token;
    console.log(token);
    if (token) {
        const email = verify(token,'secret').email;
        console.log(email);
    }
}