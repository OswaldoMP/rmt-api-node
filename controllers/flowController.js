const { Flow, User } = require('../models/index');
const jwt = require('jsonwebtoken');

const usersFlow = async(req, res) => {
    try {
        let id = req.params.id;
        let user = await User.findByPk(id, {
            attributes: ['id', 'name', 'mail']
        });

        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'There is not user'
            });
        }

        user.getAllFlow().then(async(allFlow) => {
            let flows = allFlow.filter(flow => flow.isDelete != true);

            return res.status(200).json({
                ok: true,
                flows
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

const show = async(req, res) => {
    try {
        let flows = await Flow.findAll({
            where: {
                isDelete: false
            },
            include: [{
                association: 'user',
                attributes: ['id', 'name', 'mail']
            }, ]
        });

        if (flows.length == 0) {
            return res.status(400).json({
                ok: false,
                message: 'There are not flows'
            });
        }

        return res.status(200).json({
            ok: true,
            flows
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: {
                error
            }
        });
    }
};

const create = async(req, res) => {
    try {
        let body = req.body;
        let date = new Date();

        body.UUID = new Date().getTime();
        body.typeStep = [req.body.step1, req.body.step2, req.body.step3];
        body.date = date.toISOString().split('T')[0];
        body.version = 1;

        let flow = await Flow.create(body);

        if (!flow) {
            return res.status(400).json({
                ok: false,
                message: 'Fail create flow'
            });
        }

        return res.status(200).json({
            ok: true,
            flow
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

        let flow = await Flow.findOne({
            where: {
                id: id,
                isDelete: false
            },
            include: [
                { association: 'allUserBrief' },
                { association: 'allValidateCamera' },
                { association: 'allSign' },
                {
                    association: 'user',
                    attributes: ['id', 'name', 'mail']
                }
            ]
        });

        if (!flow) {
            return res.status(400).json({
                ok: false,
                message: 'There is not flow'
            });
        }

        return res.status(200).json({
            ok: true,
            flow
        })
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
        let flowId = req.query.flow;

        let _flow = await Flow.findByPk(flowId, {
            // attributes: ['id', 'name', 'mail']
        });

        if (!_flow) {
            return res.status(400).json({
                ok: false,
                message: 'There is not flow'
            });
        }

        body.version = _flow.version + 1;

        let flow = await Flow.update(body, {
            where: {
                id: id
            }
        });

        if (flow[0] == 0) {
            return res.status(400).json({
                ok: false,
                message: 'Fail update. There is not flow'
            });
        }

        return res.status(200).json({
            ok: true,
            flow
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

const destroy = async(req, res) => {
    try {
        let id = req.params.id;

        let flow = await Flow.update({
            isDelete: true,
        }, {
            where: {
                id: id
            }
        });

        if (flow[0] == 0) {
            return res.status(400).json({
                ok: false,
                message: 'Fail update. There is not flow'
            });
        }

        return res.status(200).json({
            ok: true,
            flow
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

const public = (req, res) => {
    try {
        let id = req.params.id
        Flow.update({
                isPublic: true
            }, {
                where: {
                    id: id,
                    isDelete: false
                }
            }).then(data => {
                if (data > 0) {
                    return res.status(200).json({
                        ok: true,
                        data
                    });
                }
                return res.status(400).json({
                    ok: false,
                    message: 'There is not user brief'
                });
            })
            .catch(erro => {
                return res.status(500).json({
                    ok: false,
                    message: {
                        erro
                    }
                })
            })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: {
                error
            }
        });
    }
}

const showPublic = async(req, res) => {
    try {
        let publicFlows = await Flow.findAll({
            where: {
                isDelete: false,
                isPublic: true
            },
            include: [{
                association: 'user',
                attributes: ['id', 'name', 'mail']
            }]
        });

        if (publicFlows.length > 0) {
            return res.status(200).json({
                ok: true,
                publicFlows
            });
        }

        return res.status(400).json({
            ok: false,
            message: 'There are not public flows'
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

const createToken = async(req, res) => {
    try {
        let id = req.params.id;

        let flow = await Flow.findOne({
            where: {
                id: id,
                isDelete: false,
                isPublic: true
            },
            include: [{
                association: 'user',
            }]
        });

        if (!flow) {
            return res.status(400).json({
                ok: false,
                message: 'There is not flow'
            });
        }

        let token = jwt.sign({
            flow
        }, process.env.SEED, { expiresIn: '5m' });

        return res.status(200).json({
            ok: true,
            token
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

const allFlow = async(req, res) => {
    try {
        let flows = await Flow.findAll();
        return res.json({
            ok: true,
            flows
        });
    } catch (error) {
        return res.json({
            ok: false,
            message: {
                error
            }
        });
    }
}

module.exports = {
    show,
    create,
    usersFlow,
    showById,
    update,
    destroy,
    public,
    showPublic,
    createToken,
    allFlow
}