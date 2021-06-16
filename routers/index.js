const express = require('express');
const app = express();

app.use('/api/v1/register', require('./userRouter'));
app.use('/api/v1/login', require('./userRouter'));
app.use('/api/v1/public-flows', require('../controllers/flowController').showPublic);

app.use('/api/v1/flow', require('./flowRouter'));
app.use('/api/v1/user-brief', require('./userBriefRouter'));
app.use('/api/v1/validate-camera', require('./validateCameraRotuer'));

app.use('/check', (req, res) => {
    res.status(200).json({
        ok: true,
        message: 'Deploy',
    });
});

module.exports = app;