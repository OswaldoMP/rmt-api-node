const jwt = require('jsonwebtoken');

const AuthorizationToken = (req, res, next) => {

    let token = req.get('Authorization')

    jwt.verify(token, process.env.SEED, (err, data) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });

        }
        req.user = data.user;
        next();
    });


}

const validateAccessToken = (req, res, next) => {

    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, data) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });

        }
        req.flow = data.flow;
        next();
    });


}

module.exports = {
    AuthorizationToken,
    validateAccessToken
}