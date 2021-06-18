const { ValidateCamera, Flow } = require('../models/index');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const show = async(req, res) => {
    try {
        let cameras = await ValidateCamera.findAll();

        if (cameras.length == 0) {
            return res.status(400).json({
                ok: false,
                message: 'There are not user cameras'
            });
        }

        return res.status(200).json({
            ok: true,
            cameras
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
        let file = req.files.file;
        body.id_flow = id_flow;
        console.log(file);
        verificationFlow(id_flow).then(async(data) => {
            if (data) {
                const cloudinaryRes = await cloudinary.uploader.upload(file.tempFilePath, {
                    resource_type: "video"
                });

                body.file = cloudinaryRes.secure_url;
                let camera = await ValidateCamera.create(body);

                if (!camera) {
                    return res.status(400).json({
                        ok: false,
                        message: 'Fail create validate camera'
                    });
                }

                return res.status(200).json({
                    ok: true,
                    camera
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
        let camera = await ValidateCamera.findByPk(id, {
            include: [
                { association: 'flow' }
            ]
        });

        if (!camera) {
            return res.status(400).json({
                ok: false,
                message: 'There is not validate camera'
            });
        }

        return res.status(200).json({
            ok: true,
            camera
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

        let camera = await ValidateCamera.update(body, {
            where: {
                id: id
            },
        });

        if (camera[0] == 0) {
            return res.status(400).json({
                ok: false,
                message: 'Fail update. There is no validate camera'
            });
        }

        return res.status(200).json({
            ok: true,
            camera
        });
    } catch (error) {

    }
}

const destroy = (req, res) => {
    try {
        let id = req.params.id;
        ValidateCamera.destroy({
                where: {
                    id: id
                }
            }).then(data => {
                if (data > 0) {
                    return res.status(200).json({
                        ok: true,
                        data,
                        message: 'validate camera deleted'
                    });
                }
                return res.status(400).json({
                    ok: false,
                    message: 'Fail delete. There is not validate camera',
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