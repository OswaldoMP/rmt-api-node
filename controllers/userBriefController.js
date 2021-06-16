const { UserBrief, Flow } = require('../models/index');

const show = async(req, res) => {
    try {
        let userBriefs = await UserBrief.findAll();

        if (userBriefs.length == 0) {
            return res.status(400).json({
                ok: false,
                message: 'There are not user briefs'
            });
        }

        return res.status(200).json({
            ok: true,
            userBriefs
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

        verificationFlow(id_flow).then(async(data) => {
            if (data) {

                let userBrief = await UserBrief.create(body);

                if (!userBrief) {
                    return res.status(400).json({
                        ok: false,
                        message: 'Fail create user brief'
                    });
                }

                return res.status(200).json({
                    ok: true,
                    userBrief
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
        let userBrief = await UserBrief.findByPk(id, {
            include: [
                { association: 'flow' }
            ]
        });

        if (!userBrief) {
            return res.status(400).json({
                ok: false,
                message: 'There is not user brief'
            });
        }

        return res.status(200).json({
            ok: true,
            userBrief
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

        let userBrief = await UserBrief.update(body, {
            where: {
                id: id
            },
        });

        if (userBrief[0] == 0) {
            return res.status(400).json({
                ok: false,
                message: 'Fail update. There is no user brief'
            });
        }

        return res.status(200).json({
            ok: true,
            userBrief
        });
    } catch (error) {

    }
}

const destroy = (req, res) => {
    try {
        let id = req.params.id;
        UserBrief.destroy({
                where: {
                    id: id
                }
            }).then(data => {
                if (data > 0) {
                    return res.status(200).json({
                        ok: true,
                        data,
                        message: 'user brief deleted'
                    });
                }
                return res.status(400).json({
                    ok: false,
                    message: 'Fail delete. There is not user brief',
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