const jwt = require('jsonwebtoken');

// Tạo token từ payload và secret
function generateAccessToken(jsonInfo) {
    return jwt.sign(jsonInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.MAXAGE });
}

// Xác thực token và trả về payload
function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
        console.error(err);
        return null;
    }
}

module.exports = {generateAccessToken, verifyToken};