const { User } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const login = async(req, res) => {
    try {
        let { mail, password } = req.body;

        let user = await User.findOne({
            where: {
                mail: mail
            }
        });

        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'Fail. Incorrect username or password'
            });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({
                ok: false,
                message: 'Fail. Incorrect username or password'
            });
        }

        user.password = '';
        let token = jwt.sign({
            user
        }, process.env.SEED, { expiresIn: process.env.LIFE_TOKEN });

        return res.status(200).json({
            ok: true,
            user,
            token,
        });
    } catch (error) {
        return res.send(500).json({
            ok: false,
            message: {
                error
            }
        })
    }
}

module.exports = {
    register,
    login
}