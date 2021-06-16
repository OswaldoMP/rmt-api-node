const { User } = require('../models/index');
const bcrypt = require('bcrypt');

const register = async(req, res) => {
    let body = req.body;
    console.log(body);
    body.password = bcrypt.hashSync(req.body.password, 10);
    try {
        User.create(body).then((user) => {
                return res.status(200).json({
                    ok: true,
                    message: 'user created'
                });
            })
            .catch(erro => {
                return res.status(500).json({
                    ok: false,
                    message: 'Fail. Create user',
                    erro
                });
            });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: error
        })
    }
}

const login = (req, res) => {

}

module.exports = {
    register,
    login
}