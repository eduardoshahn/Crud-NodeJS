import { Router } from 'express';
import { requestLogin } from '../models/usuario.model';
import verifyToken from '../middleware/usuarios.middleware';
import {
  getAll, createUser, deleteUser, updateUser,
} from '../controllers/usuario.controller';

const routes = new Router();

routes.get('/', (req, res) => {
  res.status(200).json({ ok: 'conected' });
});

routes.get('/usuario', verifyToken, getAll);

routes.get('/login', requestLogin);

routes.post('/usuario', verifyToken, createUser);

routes.delete('/usuario/:id', verifyToken, deleteUser);

routes.put('/usuario/:id', verifyToken, updateUser);

export default routes;
