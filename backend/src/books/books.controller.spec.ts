import * as status from 'http-status';
import { pool } from '../mysql';
import * as BooksController from './books.controller';
import ErrorResponse from '../utils/error/errorResponse';
import * as errorCode from '../utils/error/errorCode';

describe('BooksController', () => {
  afterAll(() => {
    pool.end();
  });

  const mockReq = () => {
    const req: any = {};
    req.query = {};
    req.params = {};
    req.body = {};
    req.user = {};
    return req;
  };
  const mockResp = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it('Search book information', async () => {
    const req = mockReq();
    req.query.query = '파이썬';
    req.query.page = '3';
    req.query.limit = '4';
    const res = mockResp();
    const next = jest.fn();
    await BooksController.searchBookInfo(req, res, next);
    expect(res.status.mock.calls[0][0]).toBe(status.OK);
    const [[jsonResult]] = res.json.mock.calls;
    expect(jsonResult).toHaveProperty('items[0].id');
    expect(jsonResult).toHaveProperty('items[0].title');
    expect(jsonResult).toHaveProperty('items[0].author');
    expect(jsonResult).toHaveProperty('items[0].publisher');
    expect(jsonResult).toHaveProperty('items[0].isbn');
    expect(jsonResult).toHaveProperty('items[0].image');
    expect(jsonResult).toHaveProperty('items[0].publishedAt');
    expect(jsonResult).toHaveProperty('items[0].createdAt');
    expect(jsonResult).toHaveProperty('items[0].updatedAt');
    expect(jsonResult).toHaveProperty('categories[0].name');
    expect(jsonResult).toHaveProperty('categories[0].count');
  });

  it('Search book information sorted by title', async () => {
    const req = mockReq();
    req.query.query = '파이썬';
    req.query.sort = 'title';
    req.query.page = '3';
    req.query.limit = '4';
    const res = mockResp();
    const next = jest.fn();
    await BooksController.searchBookInfo(req, res, next);
    expect(res.status.mock.calls[0][0]).toBe(status.OK);
    const [[jsonResult]] = res.json.mock.calls;
    expect(jsonResult).toHaveProperty('items[0].id');
    expect(jsonResult).toHaveProperty('items[0].title');
    expect(jsonResult).toHaveProperty('items[0].author');
    expect(jsonResult).toHaveProperty('items[0].publisher');
    expect(jsonResult).toHaveProperty('items[0].isbn');
    expect(jsonResult).toHaveProperty('items[0].image');
    expect(jsonResult).toHaveProperty('items[0].publishedAt');
    expect(jsonResult).toHaveProperty('items[0].createdAt');
    expect(jsonResult).toHaveProperty('items[0].updatedAt');
    expect(jsonResult).toHaveProperty('categories[0].name');
    expect(jsonResult).toHaveProperty('categories[0].count');
  });

  it('Search book information sorted by time', async () => {
    const req = mockReq();
    req.query.query = '파이썬';
    req.query.sort = 'new';
    req.query.page = '3';
    req.query.limit = '4';
    const res = mockResp();
    const next = jest.fn();
    await BooksController.searchBookInfo(req, res, next);
    expect(res.status.mock.calls[0][0]).toBe(status.OK);
    const [[jsonResult]] = res.json.mock.calls;
    expect(jsonResult).toHaveProperty('items[0].id');
    expect(jsonResult).toHaveProperty('items[0].title');
    expect(jsonResult).toHaveProperty('items[0].author');
    expect(jsonResult).toHaveProperty('items[0].publisher');
    expect(jsonResult).toHaveProperty('items[0].isbn');
    expect(jsonResult).toHaveProperty('items[0].image');
    expect(jsonResult).toHaveProperty('items[0].publishedAt');
    expect(jsonResult).toHaveProperty('items[0].createdAt');
    expect(jsonResult).toHaveProperty('items[0].updatedAt');
    expect(jsonResult).toHaveProperty('categories[0].name');
    expect(jsonResult).toHaveProperty('categories[0].count');
  });

  it('Search book information with category', async () => {
    const req = mockReq();
    req.query.query = '코딩';
    req.query.page = '0';
    req.query.limit = '10';
    req.query.category = 'IT 일반';
    const res = mockResp();
    const next = jest.fn();
    await BooksController.searchBookInfo(req, res, next);
    expect(res.status.mock.calls[0][0]).toBe(status.OK);
    const [[jsonResult]] = res.json.mock.calls;
    expect(jsonResult).toHaveProperty('items[0].id');
    expect(jsonResult).toHaveProperty('items[0].title');
    expect(jsonResult).toHaveProperty('items[0].author');
    expect(jsonResult).toHaveProperty('items[0].publisher');
    expect(jsonResult).toHaveProperty('items[0].isbn');
    expect(jsonResult).toHaveProperty('items[0].image');
    expect(jsonResult).toHaveProperty('items[0].publishedAt');
    expect(jsonResult).toHaveProperty('items[0].createdAt');
    expect(jsonResult).toHaveProperty('items[0].updatedAt');
    expect(jsonResult).toHaveProperty('categories[0].name');
    expect(jsonResult).toHaveProperty('categories[0].count');
  });

  it('Search book information fails', async () => {
    const req = mockReq();
    const res = mockResp();
    const next = jest.fn();
    await BooksController.searchBookInfo(req, res, next);
    expect(next.mock.calls[0][0]).toEqual(
      new ErrorResponse(errorCode.INVALID_INPUT, status.BAD_REQUEST),
    );
  });

  it('sortInfo sorted by new', async () => {
    const req = mockReq();
    req.query.sort = 'new';
    req.query.limit = '10';
    const res = mockResp();
    const next = jest.fn();
    await BooksController.sortInfo(req, res, next);
    expect(res.status.mock.calls[0][0]).toBe(status.OK);
    const [[jsonResult]] = res.json.mock.calls;
    expect(jsonResult).toHaveProperty('items[0].id');
    expect(jsonResult).toHaveProperty('items[0].title');
    expect(jsonResult).toHaveProperty('items[0].author');
    expect(jsonResult).toHaveProperty('items[0].publisher');
    expect(jsonResult).toHaveProperty('items[0].isbn');
    expect(jsonResult).toHaveProperty('items[0].image');
    expect(jsonResult).toHaveProperty('items[0].category');
    expect(jsonResult).toHaveProperty('items[0].publishedAt');
    expect(jsonResult).toHaveProperty('items[0].createdAt');
    expect(jsonResult).toHaveProperty('items[0].updatedAt');
    expect(jsonResult).toHaveProperty('items[0].lendingCnt');
  });

  it('sortInfo sorted by popular', async () => {
    const req = mockReq();
    req.query.sort = 'popular';
    req.query.limit = '10';
    const res = mockResp();
    const next = jest.fn();
    await BooksController.sortInfo(req, res, next);
    expect(res.status.mock.calls[0][0]).toBe(status.OK);
    const [[jsonResult]] = res.json.mock.calls;
    expect(jsonResult).toHaveProperty('items[0].id');
    expect(jsonResult).toHaveProperty('items[0].title');
    expect(jsonResult).toHaveProperty('items[0].author');
    expect(jsonResult).toHaveProperty('items[0].publisher');
    expect(jsonResult).toHaveProperty('items[0].isbn');
    expect(jsonResult).toHaveProperty('items[0].image');
    expect(jsonResult).toHaveProperty('items[0].category');
    expect(jsonResult).toHaveProperty('items[0].publishedAt');
    expect(jsonResult).toHaveProperty('items[0].createdAt');
    expect(jsonResult).toHaveProperty('items[0].updatedAt');
    expect(jsonResult).toHaveProperty('items[0].lendingCnt');
  });

  it('sortInfo fails', async () => {
    const req = mockReq();
    const res = mockResp();
    const next = jest.fn();
    await BooksController.sortInfo(req, res, next);
    expect(next.mock.calls[0][0]).toEqual(
      new ErrorResponse(errorCode.INVALID_INPUT, status.BAD_REQUEST),
    );
  });

  it('getInfoId with valid inputs', async () => {
    const req = mockReq();
    req.params.id = '12';
    const res = mockResp();
    const next = jest.fn();
    await BooksController.getInfoId(req, res, next);
    expect(res.status.mock.calls[0][0]).toBe(status.OK);
    const [[jsonResult]] = res.json.mock.calls;
    expect(jsonResult).toHaveProperty('id');
    expect(jsonResult).toHaveProperty('title');
    expect(jsonResult).toHaveProperty('author');
    expect(jsonResult).toHaveProperty('publisher');
    expect(jsonResult).toHaveProperty('isbn');
    expect(jsonResult).toHaveProperty('image');
    expect(jsonResult).toHaveProperty('category');
    expect(jsonResult).toHaveProperty('publishedAt');
    expect(jsonResult).toHaveProperty('books[0].id');
    expect(jsonResult).toHaveProperty('books[0].callSign');
    expect(jsonResult).toHaveProperty('books[0].donator');
    expect(jsonResult).toHaveProperty('books[0].dueDate');
    expect(jsonResult).toHaveProperty('books[0].isLendable');
  });

  it('getInfoId fails with invalid inputs', async () => {
    const req = mockReq();
    const res = mockResp();
    const next = jest.fn();
    await BooksController.getInfoId(req, res, next);
    expect(next.mock.calls[0][0]).toEqual(
      new ErrorResponse(errorCode.INVALID_INPUT, status.BAD_REQUEST),
    );
  });
  it('search with valid inputs', async () => {
    const req = mockReq();
    req.query.query = '파이썬';
    req.query.page = '0';
    req.query.limit = '10';
    const res = mockResp();
    const next = jest.fn();
    await BooksController.search(req, res, next);
    expect(res.status.mock.calls[0][0]).toBe(status.OK);
    const [[jsonResult]] = res.json.mock.calls;
    expect(jsonResult).toHaveProperty('items[0].id');
    expect(jsonResult).toHaveProperty('items[0].title');
    expect(jsonResult).toHaveProperty('items[0].author');
    expect(jsonResult).toHaveProperty('items[0].publisher');
    expect(jsonResult).toHaveProperty('items[0].isbn');
    expect(jsonResult).toHaveProperty('items[0].category');
    expect(jsonResult).toHaveProperty('items[0].isLendable');
    expect(jsonResult).toHaveProperty('meta.totalItems');
    expect(jsonResult).toHaveProperty('meta.itemCount');
    expect(jsonResult).toHaveProperty('meta.itemsPerPage');
    expect(jsonResult).toHaveProperty('meta.totalPages');
    expect(jsonResult).toHaveProperty('meta.currentPage');
  });

  it('search with invalid inputs', async () => {
    const req = mockReq();
    const res = mockResp();
    const next = jest.fn();
    await BooksController.search(req, res, next);
    expect(next.mock.calls[0][0]).toEqual(
      new ErrorResponse(errorCode.INVALID_INPUT, status.BAD_REQUEST),
    );
  }); 
  // data가 추가되어서 test시 callsign 수정 필요-------------------------------------------------------------------------
  it('create with valid inputs', async () => {
    const req = mockReq();
    req.body = {
      title: '작별인사 (김영하 장편소설)',
      author: '김영하',
      publisher: '다산',
      categoryId: 1,
      image: 'image',
      donator: 'donator cannot be null',
      pubdate: '20220502',
      callSign: 'e7.79.v2.c13',
    };
    const res = mockResp();
    const next = jest.fn();
    await BooksController.createBook(req, res, next);
    expect(res.status.mock.calls[0][0]).toBe(status.OK);
    const jsonResult = res.json.mock.calls;
    expect(jsonResult).toEqual([[{"code": 200, "message": "DB에 insert 성공하였습니다."}]]);
  });

  it('createBook with invalid inputs', async () => {
    const req = mockReq();
    const res = mockResp();
    const next = jest.fn();
    await BooksController.createBook(req, res, next);
    expect(next.mock.calls[0][0]).toEqual(
      new ErrorResponse(errorCode.INVALID_INPUT, status.BAD_REQUEST),
    );
  });

  it('createBookInfo with valid inputs', async () => {
    const req = mockReq();
    req.query.isbnQuery = '9791191114225';
    const res = mockResp();
    const next = jest.fn();
    await BooksController.createBookInfo(req, res, next);
    expect(res.status.mock.calls[0][0]).toBe(status.OK);
    const [[jsonResult]] = res.json.mock.calls;
    expect(jsonResult).toHaveProperty('isbnInNaver');
    expect(jsonResult).toHaveProperty('isbnInBookInfo');
    expect(jsonResult).toHaveProperty('sameTitleOrAuthor');
  });

  it('createBookInfo with invalid inputs', async () => {
    const req = mockReq();
    const res = mockResp();
    const next = jest.fn();
    await BooksController.createBookInfo(req, res, next);
    expect(next.mock.calls[0][0]).toEqual(
      new ErrorResponse(errorCode.INVALID_INPUT, status.BAD_REQUEST),
    );
  });
});
