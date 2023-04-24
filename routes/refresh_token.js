const jwt = require("jsonwebtoken");

function refresh_token(req, res) {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
        res.send({token: ""});
        return;
    }

    try {
        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, process.env.TOKEN_SECRET);

        const jsonObject = {email:decoded.email, user_id:decoded.user_id};
        // Generate a new access token
        const token = jwt.sign(jsonObject, process.env.TOKEN_SECRET,
            { expiresIn: process.env.MAX_AGE_TOKEN });

        // Send the new access token to the client
        res.cookie('token', token, { httpOnly: true, maxAge: process.env.MAX_AGE_COOKIE });
        res.send({token: token});
    } catch (err) {
        console.error(err);
        res.send({token: ""});
    }
}

module.exports = {refresh_token};