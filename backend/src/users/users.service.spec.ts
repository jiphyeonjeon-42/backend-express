/* eslint no-console: "off" */
import { pool } from '../mysql';
import * as UsersService from './users.service';

describe('UsersService', () => {
  let fixtureEmail: string;

  afterAll(() => {
    pool.end();
    // DELETE FROM user WHERE email LIKE '%@test-fixture.net';
  });

  beforeAll(async () => {
    fixtureEmail = `aaaa.${new Date().toISOString()}@test-fixture.net`;
    await UsersService.createUser(fixtureEmail, 'password');
    const users: any = await UsersService.searchUserByEmail(fixtureEmail);
    const user: any = users?.items[0];
    await UsersService.updateUserAuth(user.id, `nickname-${fixtureEmail}`, user.id + 1000, `slack-${fixtureEmail}`, 1, '2022-07-02');
  });

  // searchUserByNickName
  it('[searchUserByNickName] email 테스트 ', async () => {
    const email = 'example_role2_17@gmail.com';
    const limit = 5;
    const page = 0;
    expect(await UsersService.searchUserBynicknameOrEmail(email, limit, page)).toStrictEqual({
      items: [
        {
          id: 4,
          email: 'example_role2_17@gmail.com',
          nickname: 'tkim',
          intraId: 81394,
          slack: 'U01H0NWN9QE',
          penaltyEndDate: new Date(Date.parse('2022-06-10T06:50:13.000Z')),
          role: 2,
          lendings: [],
          overDueDay: 0,
        },
      ],
      meta: {
        totalItems: 1,
        itemCount: 1,
        itemsPerPage: 5,
        totalPages: 1,
        currentPage: 1,
      },
    });
  });

  it('[searchUserByNickName] nickname 테스트 ', async () => {
    const nickname = 'tkim';
    const limit = 5;
    const page = 0;
    expect(await UsersService.searchUserBynicknameOrEmail(nickname, limit, page)).toStrictEqual({
      items: [
        {
          id: 4,
          email: 'example_role2_17@gmail.com',
          nickname: 'tkim',
          intraId: 81394,
          slack: 'U01H0NWN9QE',
          penaltyEndDate: new Date(Date.parse('2022-06-10T06:50:13.000Z')),
          role: 2,
          lendings: [],
          overDueDay: 0,
        },
      ],
      meta: {
        totalItems: 1,
        itemCount: 1,
        itemsPerPage: 5,
        totalPages: 1,
        currentPage: 1,
      },
    });
  });
  // userReservations
  it('[userReservations] 예약이 없는 케이스 user tkim id = 4 ', async () => {
    const userId = 4;
    expect(await UsersService.userReservations(userId)).toStrictEqual(
      [],
    );
  });

  it('[userReservations] 예약이 있는 케이스 user seongyle3 id = 1410 ', async () => {
    const userId = 1410;
    expect(await UsersService.userReservations(userId)).toStrictEqual(
      [
        {
          reservationId: 8,
          reservedBookInfoId: 7,
          reservationDate: new Date(Date.parse('2022-05-18T09:20:28.073Z')),
          endAt: null,
          ranking: 1,
          title: '디버깅을 통해 배우는 리눅스 커널의 구조와 원리. 2(위키북스 유닉스...',
          author: '김동현',
          image: 'https://image.kyobobook.co.kr/images/book/xlarge/997/x9791158391997.jpg',
        },
        {
          reservationId: 18,
          reservedBookInfoId: 7,
          reservationDate: new Date(Date.parse('2022-05-18T09:20:28.079Z')),
          endAt: null,
          ranking: 2,
          title: '디버깅을 통해 배우는 리눅스 커널의 구조와 원리. 2(위키북스 유닉스...',
          author: '김동현',
          image: 'https://image.kyobobook.co.kr/images/book/xlarge/997/x9791158391997.jpg',
        },
      ],
    );
  });

  // searchUserById
  it('[searchUserById] User id 4 = tkim', async () => {
    const userId = 4;
    expect(await UsersService.searchUserById(userId)).toStrictEqual(
      {
        items: [
          {
            id: 4,
            email: 'example_role2_17@gmail.com',
            nickname: 'tkim',
            intraId: 81394,
            slack: 'U01H0NWN9QE',
            penaltyEndDate: new Date(Date.parse('2022-06-10T06:50:13.000Z')),
            role: 2,
            updatedAt: new Date(Date.parse('2022-06-10T06:50:13.771Z')),
            overDueDay: 0,
            lendings: [],
          },
        ],
      },
    );
  });

  // searchUserByIntraId2
  it('존재하는 이용자의 intraId로 UsersService의 searchUserByIntraId() 호출하면 해당 이용자를 반환한다.', async () => {
    // Given
    const email = fixtureEmail;
    const user: any = (await UsersService.searchUserByEmail(email))?.items[0];

    // When
    // intraId로 UsersService의 searchUserByIntraId() 호출
    const expected: any[] = await UsersService.searchUserByIntraId(user.intraId);

    // Then
    // 이용자를 반환. 반환 검증하는 방법 == user id === result id
    expect(expected[0].id).toEqual(user.id);
  });

  // searchUserByIntraId
  it('[searchUserByIntraId] User intraId 14', async () => {
    const intraId = 14;
    expect(await UsersService.searchUserByIntraId(intraId)).toStrictEqual(
      [
        {
          createdAt: new Date(Date.parse('2022-06-30T14:51:05.019Z')),
          email: 'example_role3_1@gmail.com',
          id: 1434,
          intraId: 14,
          nickname: 'vocal1',
          password: '1234',
          penaltyEndDate: new Date(Date.parse('2022-06-30T14:51:05.000Z')),
          role: 3,
          slack: null,
          updatedAt: new Date(Date.parse('2022-06-30T14:51:05.019Z')),
        },
      ],
    );
  });

  // searchAllUsers
  it('[searchAllUsers] 3 Users in page 6 are', async () => {
    const limit = 3;
    const page = 6;
    expect(await UsersService.searchAllUsers(limit, page)).toStrictEqual({
      items: [
        {
          id: 1400,
          email: 'example_role0_9@gmail.com',
          nickname: null,
          intraId: null,
          slack: null,
          penaltyEndDate: new Date(Date.parse('2022-06-30T14:51:05.000Z')),
          role: 0,
          lendings: [],
          overDueDay: 0,
        },
        {
          id: 1401,
          email: 'example_role0_10@gmail.com',
          nickname: null,
          intraId: null,
          slack: null,
          penaltyEndDate: new Date(Date.parse('2022-06-30T14:51:05.000Z')),
          role: 0,
          lendings: [],
          overDueDay: 0,
        },
        {
          id: 1402,
          email: 'example_role0_11@gmail.com',
          nickname: null,
          intraId: null,
          slack: null,
          penaltyEndDate: new Date(Date.parse('2022-06-30T14:51:05.000Z')),
          role: 0,
          lendings: [],
          overDueDay: 0,
        },
      ],
      meta: {
        totalItems: 65,
        itemCount: 3,
        itemsPerPage: 3,
        totalPages: 22,
        currentPage: 7,
      },
    });
  });
});
