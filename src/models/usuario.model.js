/* eslint-disable max-len *//* eslint-disable arrow-parens *//* eslint-disable object-shorthand *//* eslint-disable consistent-return *//* eslint-disable prefer-arrow-callback *//* eslint-disable func-names *//* eslint-disable space-before-function-paren *//* eslint-disable no-unused-vars *//* eslint-disable no-console *//* eslint-disable no-shadow *//* eslint-disable no-sequences *//* eslint-disable no-use-before-define */
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import connection from './mongoConnection';

const mongodb = require('mongodb');

const { MongoClient } = mongodb;

const modelRead = async () => {
  const db = await connection();
  return db.collection('usuarios').find().toArray();
};

const modelCreate = async ({ email, senha }) => {
  const db = await connection();
  const ifExists = await userExists({ email });
  if (ifExists) return { message: 'user already exists' };

  const user = await db.collection('usuarios').insertOne({ email, senha });
  const { insertedId: _id } = user;
  return { email, _id };
};

const userExists = async ({ email, pwdHash }) => {
  const db = await connection();
  let user = null;

  if (email) {
    user = await db.collection('usuarios').findOne({ email });
  }

  return user;
};

const modelDelete = async ({ id }) => {
  const db = await connection();
  await db.collection('usuarios').deleteOne({ _id: ObjectId(id) });
  return { id };
};

const modelUpdate = async ({ id, email, senha }) => {
  const db = await connection();
  await db.collection('usuarios').updateOne({ _id: ObjectId(id) }, { $set: { email, senha } });
  return { id, email };
};

export default {
  modelRead, modelCreate, userExists, modelDelete, modelUpdate,
};
