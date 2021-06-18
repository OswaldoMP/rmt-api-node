const express = require('express');
const { AuthorizationToken, validateAccessToken } = require('../middlewares/authentication');
const app = express();

app.use('/api/v1/register', require('./userRouter'));
app.use('/api/v1/login', require('./userRouter'));
app.use('/api/v1/public-flows', require('../controllers/flowController').showPublic);
app.use('/api/v1/create-token', require('./flowRouter').post('/public-flows/:id', require('../controllers/flowController').createToken));
app.use('/api/v1/allFlow', require('../controllers/flowController').allFlow);

app.use('/api/v1/flow', [AuthorizationToken], require('./flowRouter'));
app.use('/api/v1/user-brief', [validateAccessToken], require('./userBriefRouter'));
app.use('/api/v1/validate-camera', [validateAccessToken], require('./validateCameraRotuer'));
app.use('/api/v1/sign', [validateAccessToken], require('./signRouter'));

app.use('/check', (req, res) => {
    res.status(200).json({
        ok: true,
        message: 'Deploy',
    });
});

module.exports = app;