import { Request, Response } from 'express';
import config from '../config';
import { FtTypes } from './auth.service';
import clientValidator from './auth.validator';
import * as usersService from '../users/users.service';
import * as authService from './auth.service';

export const getOAuth = (req: Request, res: Response) => {
  const clientId = config.client.id;
  const redirectURL = config.client.redirectURL ?? 'http://localhost:3000/auth/token';
  const clientURL = (req.query.clientURL as string) ?? 'http://localhost:3000';

  const oauthUrl = `https://api.intra.42.fr/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectURL,
  )}&response_type=code&state=${encodeURIComponent(clientURL)}`;
  res.status(302).redirect(oauthUrl);
};

export const getToken = async (req: Request, res: Response): Promise<void> => {
  const clientURL = clientValidator(req.query.state);
  if (!req.user) res.status(401).redirect(config.client.redirectURL);
  // 아래 실행되지 않음

  const { intra, login, imageURL } = req.user as any;
  const ftUserInfo: FtTypes = {
    intra,
    login,
    imageURL,
  };

  // TODOs
  let user: usersService.User = await usersService.identifyUserByLogin(ftUserInfo.login);
  if (!user) {
    user = await usersService.createUser(ftUserInfo);
  }
  const jwtInfo = authService.issueJwt(user);

  res.cookie('access_token', jwtInfo.token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    expires: new Date(jwtInfo.exp),
  });
  return res.status(302).redirect(`${clientURL}/auth`);
};
