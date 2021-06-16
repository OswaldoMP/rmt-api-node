const express = require('express');
const app = express();

app.use('/api/v1/register', require('./userRouter'));
app.use('/api/v1/login', require('./userRouter'));

app.use('/api/v1/flow', require('./flowRouter'));


app.use('/check', (req, res) => {
    res.status(200).json({
        ok: true,
        message: 'Deploy',
    });
});

module.exports = app;