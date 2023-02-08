/* eslint-disable max-len *//* eslint-disable import/no-named-as-default-member *//* eslint-disable import/no-unresolved */// eslint-disable-next-line max-len/* eslint-disable no-var */ /* eslint-disable max-len */ /* eslint-disable prefer-const */ /* eslint-disable max-len *//* eslint-disable no-return-assign *//* eslint-disable no-param-reassign *//* eslint-disable arrow-parens *//* eslint-disable consistent-return *//* eslint-disable no-shadow */
import jwt from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';

const userService = require('../services/usuario.services');

const controllerRead = async (req, res) => {
  const users = await userService.serviceRead();

  const id = '_id';

  const newList = users.map((user) => (
    {
      email: user.email,
      _id: user[`${id}`],
    }
  ));

  return res.status(200).json(newList);
};

const controllerCreate = async (req, res) => {
  const { email, senha } = req.body;
  const pwdHash = await hash(senha, 8);
  const response = await userService.serviceCreate({ email, pwd: pwdHash });

  if (response.success) {
    return res.status(200).json(response.user);
  }
  return res.status(422).json('User Already exists');
};

const controllerDelete = async (req, res) => {
  const { id } = req.params;

  const user = await userService.serviceDelete({ id });
  return res.status(200).json(user);
};

const controllerUpdate = async (req, res) => {
  const { email, senha } = req.body;
  const { id } = req.params;
  const user = await userService.serviceUpdate({ id, email, senha });
  res.status(200).json(user);
};

const authLogin = async (req, res, next) => {
  const { email, senha } = req.body;
  const user = await userService.serviceLogin({ email, senha });

  if (!user) {
    return res.status(404).send('User not found');
  }
  if (user.email && !await compare(senha, user.senha)) {
    return res.status(404).send('Incorrect Password');
  }

  return next();
};

const login = async (req, res) => {
  const { email, senha } = req;
  const usuario = ({ email, senha });
  const { _id } = usuario;

  const newToken = jwt.sign(
    {
      userId: _id,
      email,
    },
    process.env.SECRET,
    {
      expiresIn: 1440,
    },
  );

  return res.status(201).json({ token: newToken });
};

export {
  controllerRead, login, controllerCreate, controllerDelete, controllerUpdate, authLogin,
};
