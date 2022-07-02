import { pool } from '../mysql';
import config from '../config';
import * as usersService from '../users/users.service';
import * as authControllers from './auth.controller';

// jest.mock('../users/users.service')

describe('authController', () => {
  afterAll(() => {
    pool.end();
  });

  it('intraId를 가진 이용자가 유효한 JWT로 getToken()을 호출하면 /auth로 이동한다.', async () => {
    const mockSearchUserByIntraId = jest.spyOn(usersService, 'searchUserByIntraId')
    //Given : 통과한 유저는 
    const user = {
      id: 1,
      intraId: 1000,
    }
    const req = jest.fn().mockReturnValue({
      user,
    })();
    const mockRedirect = jest.fn()
    const mockNext = jest.fn()
    const res = jest.fn().mockReturnValue({
      status: () => ({ redirect: mockRedirect }),
    })();
    

    //When : getToken을 호출했을 때 searchUserByIntraId(id)를 호출
    await authControllers.getToken(req, res, mockNext);

    //Then
    // searchUserByIntraId(id)로 이용자가 존재하는지 검사한 후 
    expect(mockSearchUserByIntraId).toHaveBeenCalledWith(user.id)
    //리다이렉트한다.
    expect(mockRedirect).toHaveBeenCalledWith(`${config.client.clientURL}/auth`)
    
  })
})

//export const getToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//  try {
//    const { id } = req.user as any;
//    const user: models.User[] = await usersService.searchUserByIntraId(id);
//    if (user.length === 0) {
//      res.status(status.BAD_REQUEST)
//        .send(`<script type="text/javascript">window.location="${config.client.clientURL}/register?errorCode=${errorCode.NO_USER}"</script>`);
//      return;
//    }
//    await authJwt.saveJwt(req, res, user[0]);
//    res.status(302).redirect(`${config.client.clientURL}/auth`);
//  } catch (error: any) {
//    const errorNumber = parseInt(error.message ? error.message : error.errorCode, 10);
//    if (errorNumber === 101) { return next(new ErrorResponse(error.message, status.UNAUTHORIZED)); }
//    if (errorNumber >= 100 && errorNumber < 200) {
//      next(new ErrorResponse(error.message, status.BAD_REQUEST));
//    } else if (error.message === 'DB error') {
//      next(new ErrorResponse(errorCode.QUERY_EXECUTION_FAILED, status.INTERNAL_SERVER_ERROR));
//    } else {
//      logger.error(error.message);
//      next(new ErrorResponse(errorCode.UNKNOWN_ERROR, status.INTERNAL_SERVER_ERROR));
//    }
//  }
//};