import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import {
  createUser, searchAllUsers, searchUserByNickName, updateUserAuth,
} from './users.service';
import {
  createQuery, searchQuery, updateBody, updateParam,
} from './users.type';

export const search = async (
  req: Request<{}, {}, {}, searchQuery>,
  res: Response,
) => {
  const { nickName = '', page = '1', limit = '5' } = req.query;
  if (nickName === '') {
    res.send(searchAllUsers(parseInt(page, 10), parseInt(limit, 10)));
  } else if (nickName) {
    const items = JSON.parse(JSON.stringify(await
    searchUserByNickName(nickName, parseInt(limit, 10), parseInt(page, 10))));
    res.send(items);
  }
};

export const update = async (
  req: Request< updateParam, {}, updateBody, {} >,
  res: Response,
) => {
  const { id } = req.params;
  const {
    nickname = '', intraId = '0', slack = '', role = '-1',
  } = req.body;
  if (id) {
    if (nickname !== '' || intraId || slack !== '' || role !== '-1') {
      updateUserAuth(parseInt(id, 10), nickname, parseInt(intraId, 10), slack, parseInt(role, 10));
      res.status(200).send('success');
    } else res.status(400).send('Insufficient arguments');
  } else res.status(401).send('Id is invalid');
};

export const create = async (req: Request<{}, {}, {}, createQuery>) => {
  const { email, password } = req.query;
  createUser(email, await bcrypt.hash(password, 10));
};
