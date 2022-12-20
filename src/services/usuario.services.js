import { hash } from 'bcrypt';
import {
  getAll, newUser, userExists, deleta, update,
} from '../models/usuario.model';

const todos = async () => {
  const users = await getAll();
  return users;
};

const criar = async ({ email, senha }) => {
  const usuario = await userExists({ email });

  if (usuario) return usuario;

  const passwordHash = await hash(senha, 8);

  const user = await newUser({ email, senha: passwordHash });
  return user;
};

const deletar = async ({ id }) => {
  const usuario = await userExists({ id });

  if (!usuario) return { message: 'User not found' };
  const user = await deleta({ id });
  return user;
};

const atualizar = async ({ id, email, senha }) => {
  const usuario = await userExists({ id });
  if (!usuario) return { message: 'User not found' };

  const passwordHash = await hash(senha, 8);

  const user = await update({ id, email, senha: passwordHash });
  return user;
};

const login = async () => null;

export {
  todos, login, criar, deletar, atualizar,
};
