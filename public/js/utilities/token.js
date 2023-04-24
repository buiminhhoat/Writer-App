const jwt = require('jsonwebtoken');

// Tạo token
function generateAccessToken(jsonObject) {
    const accessToken = jwt.sign(jsonObject, process.env.TOKEN_SECRET,
        { expiresIn: process.env.MAX_AGE_TOKEN });
    return accessToken;
}

function generateRefreshToken(jsonObject) {
    const refreshToken = jwt.sign(jsonObject, process.env.TOKEN_SECRET, 
        {expiresIn: process.env.MAX_AGE_REFRESH_TOKEN});
    return refreshToken;
}

// Xác thực token
function authenticateToken(token) {
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        return "true";
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return "Token expired";
        } else {
            return "false";
        }
    }
}

// Refresh token
function refreshToken(jsonObject, refreshToken) {
    if (refreshToken == null) return "";
    jwt.verify(refreshToken, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return "";
        const accessToken = jwt.sign(
            jsonObject,
            process.env.TOKEN_SECRET,
            { expiresIn: process.env.MAX_AGE_TOKEN }
        );
        return accessToken;
    });
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    authenticateToken,
    refreshToken
};