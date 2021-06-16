const { Sign, Flow } = require('../models/index');

const show = async(req, res) => {
    try {
        let signs = await Sign.findAll();

        if (signs.length == 0) {
            return res.status(400).json({
                ok: false,
                message: 'There are not user signs'
            });
        }

        return res.status(200).json({
            ok: true,
            signs
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: {
                error
            }
        });
    }
}

const create = async(req, res) => {
    try {
        let body = req.body;
        let id_flow = req.query.flow;
        body.id_flow = id_flow;
        console.log(req.file);
        body.file = `files/signs/${req.file.filename}`;

        verificationFlow(id_flow).then(async(data) => {
            if (data) {

                let sign = await Sign.create(body);

                if (!sign) {
                    return res.status(400).json({
                        ok: false,
                        message: 'Fail create sign'
                    });
                }

                return res.status(200).json({
                    ok: true,
                    sign
                });
            }
            return res.status(400).json({
                ok: false,
                message: 'There is not flow'
            });
        }).catch(erro => {
            return res.status(500).json({
                ok: false,
                message: {
                    erro
                }
            });
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: {
                error
            }
        });
    }
}

const showById = async(req, res) => {
    try {
        let id = req.params.id;
        let sign = await Sign.findByPk(id, {
            include: [
                { association: 'flow' }
            ]
        });

        if (!sign) {
            return res.status(400).json({
                ok: false,
                message: 'There is not sign'
            });
        }

        return res.status(200).json({
            ok: true,
            sign
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: {
                error
            }
        });
    }
}

const update = async(req, res) => {
    try {
        let id = req.params.id;
        let body = req.body;

        let sign = await Sign.update(body, {
            where: {
                id: id
            },
        });

        if (sign[0] == 0) {
            return res.status(400).json({
                ok: false,
                message: 'Fail update. There is no sign'
            });
        }

        return res.status(200).json({
            ok: true,
            sign
        });
    } catch (error) {

    }
}

const destroy = (req, res) => {
    try {
        let id = req.params.id;
        Sign.destroy({
                where: {
                    id: id
                }
            }).then(data => {
                if (data > 0) {
                    return res.status(200).json({
                        ok: true,
                        data,
                        message: 'sign deleted'
                    });
                }
                return res.status(400).json({
                    ok: false,
                    message: 'Fail delete. There is not sign',
                });
            })
            .catch(erro => {
                return res.status(500).json({
                    ok: false,
                    message: {
                        erro
                    }
                });
            });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: {
                error
            }
        });
    }
}

function verificationFlow(id) {
    return new Promise(async(resolve, reject) => {
        try {
            let flow = await Flow.findOne({
                where: {
                    id: id,
                    isDelete: false
                },
            });
            if (!flow) {
                resolve(false);
            }

            resolve(true);
        } catch (error) {
            reject(error)
        }
    });
}

module.exports = {
    show,
    create,
    showById,
    update,
    destroy
}