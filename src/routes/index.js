/* eslint-disable max-len */ /* eslint-disable import/no-cycle */ /* eslint-disable max-len */ /* eslint-disable consistent-return */ /* eslint-disable no-return-assign */ /* eslint-disable no-param-reassign */ /* eslint-disable arrow-parens */ /* eslint-disable no-shadow */ /* eslint-disable import/no-import-module-exports */

import verifyToken from '../middleware/usuarios.middleware';
import {
  controllerRead, controllerCreate, controllerDelete, controllerUpdate, login, authCreate, authLogin,
} from '../controllers/usuario.controller';

const express = require('express');

const routes = express();

routes.get('/', (req, res) => {
  res.send({ message: 'Hello World' });
});

routes.get('/usuario', verifyToken, controllerRead);

routes.post('/usuario/login', authLogin, login);

routes.post('/usuario', authCreate, controllerCreate);

routes.delete('/usuario/:id', verifyToken, controllerDelete);

routes.put('/usuario/:id', verifyToken, controllerUpdate);

module.exports = routes;
