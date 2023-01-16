/* eslint-disable max-len *//* eslint-disable import/no-mutable-exports *//* eslint-disable no-var *//* eslint-disable import/no-cycle */ /* eslint-disable no-unused-vars */
import { hash } from 'bcrypt';
import UserModel from '../models/usuario.model';

const catchUsers = [UserModel.catchUsers];

const serviceRead = async () => {
  const users = await UserModel.modelRead();
  return users;
};

const serviceCreate = async ({ email, pwd }) => {
  const user = await UserModel.userExists({ email });
  if (user) {
    return { user };
  }
  const createdUser = await UserModel.modelCreate({ email, senha: pwd });

  return { success: true, user: createdUser };
};

const serviceDelete = async ({ id }) => {
  const usuario = await UserModel.userExists({ id });

  if (!usuario) return { message: 'User not found' };
  const user = await UserModel.modelDelete({ id });
  return user;
};

const serviceUpdate = async ({ id, email, senha }) => {
  const usuario = await UserModel.userExists({ id });
  if (!usuario) return { message: 'User not found' };

  const passwordHash = await hash(senha, 8);

  const user = await UserModel.modelUpdate({
    id,
    email,
    senha: passwordHash,
  });
  return user;
};

const login = async () => null;

export {
  serviceRead, login, serviceCreate, serviceDelete, serviceUpdate, catchUsers,
};
