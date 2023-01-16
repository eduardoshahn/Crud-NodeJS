// eslint-disable-next-line max-len
/* eslint-disable no-var */ /* eslint-disable max-len */ /* eslint-disable prefer-const */ /* eslint-disable max-len *//* eslint-disable no-return-assign *//* eslint-disable no-param-reassign *//* eslint-disable arrow-parens *//* eslint-disable consistent-return *//* eslint-disable no-shadow */
import jwt from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';

import {
  serviceRead, serviceCreate, serviceDelete, serviceUpdate,
} from '../services/usuario.services';

const users = [];

const controllerRead = async (req, res) => {
  const users = await serviceRead();

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
  const response = await serviceCreate({ email, pwd: pwdHash });
  if (response.success) {
    return res.status(200).json(response.user);
  }
  return res.status(422).json('User Already exists');
};

const authCreate = async (req, res, next) => {
  try {
    const hashedPwd = await hash(req.body.senha, 8);
    const user = { email: req.body.email, senha: hashedPwd };
    users.push(user);
    return next();
  } catch {
    return res.status(500).send('erro');
  }
};

const controllerDelete = async (req, res) => {
  const { id } = req.params;

  const user = await serviceDelete({ id });
  return res.status(200).json(user);
};

const controllerUpdate = async (req, res) => {
  const { email, senha } = req.body;
  const { id } = req.params;
  const user = await serviceUpdate({ id, email, senha });
  res.status(200).json(user);
};

const authLogin = async (req, res, next) => {
  const user = users.find(user => user.email === req.body.email);
  if (user == null) {
    return res.status(400).send('User not found');
  }
  try {
    if (await compare(req.body.senha, user.senha)) {
      return next();
    }
    return res.status(401).send('Invalid Password');
  } catch {
    return res.status(500).send('Internal Error');
  }
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
  controllerRead, login, controllerCreate, controllerDelete, controllerUpdate, authCreate, authLogin,
};
