require('./config/config');
const PORT = process.env.PORT;

const express = require('express');
const cors = require('cors');

const { sequelize } = require('./models/index');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'))

app.use(require('./routers/index'));

app.listen(PORT, () => {
    console.log(`run server ${PORT}`);

    sequelize.authenticate().then(() => {
            console.log('Conected in the data base');
        })
        .catch(() => {
            console.log('There is not conection in the data base');
        });
});