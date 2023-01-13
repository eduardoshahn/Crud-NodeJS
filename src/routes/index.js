/* eslint-disable max-len */ /* eslint-disable import/no-cycle */ /* eslint-disable max-len */ /* eslint-disable consistent-return */ /* eslint-disable no-return-assign */ /* eslint-disable no-param-reassign */ /* eslint-disable arrow-parens */ /* eslint-disable no-shadow */ /* eslint-disable import/no-import-module-exports */

import verifyToken from '../middleware/usuarios.middleware';
import {
  controllerRead, controllerCreate, controllerDelete, controllerUpdate, login,
} from '../controllers/usuario.controller';

const express = require('express');

const routes = express();

routes.get('/', (req, res) => {
  res.send({ message: 'Hello World' });
});

routes.get('/usuario', verifyToken, controllerRead);

routes.get('/login', login);

routes.post('/usuario', controllerCreate);

routes.delete('/usuario/:id', verifyToken, controllerDelete);

routes.put('/usuario/:id', verifyToken, controllerUpdate);

module.exports = routes;
