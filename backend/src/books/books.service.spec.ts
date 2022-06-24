import { pool } from '../mysql';
import * as BooksService from './books.service';
import * as models from './books.model';
import * as types from './books.type';

describe('BooksService', () => {
  afterAll(() => {
    pool.end();
  });
  // createbook test adds instance to local DB...
  it('A book is added', async () => {
    const book: types.CreateBookInfo = {
      title: '작별인사 (김영하 장편소설)',
      isbn: '9788065960874',
      author: '김영하',
      publisher: '복복서가',
      categoryId: '15',
      image: 'https://bookthumb-phinf.pstatic.net/cover/223/538/22353804.jpg?type=m1&udate=20220608',
      pubdate: '20220502',
      donator: 'seongyle1',
      callSign: 'e7.79.v2.c5',
    };
    expect(await BooksService.createBook(book)).toStrictEqual({ code: 200, message: 'DB에 insert 성공하였습니다.' });
  });

  it('SearchInfo by name, author, or isbn', async () => {
    const query = 'C언어';
    const sort = 'new';
    const page = 0;
    const limit = 3;
    const category = 'IT 일반';
    expect(await BooksService.searchInfo(query, page, limit, sort, category)).toEqual(
      expect.objectContaining({
        categories: expect.any(Array),
        items: expect.any(Array),
      }),
    );
  });

  it('Search with valid inputs', async () => {
    const query = 'C언어';
    const page = 0;
    const limit = 3;
    const result = await BooksService.search(query, page, limit);

    expect(result).toHaveProperty('items[0].id');
    expect(result).toHaveProperty('items[0].title');
    expect(result).toHaveProperty('items[0].author');
    expect(result).toHaveProperty('items[0].publisher');
    expect(result).toHaveProperty('items[0].isbn');
    expect(result).toHaveProperty('items[0].category');
    expect(result).toHaveProperty('items[0].isLendable');
    expect(result).toHaveProperty('meta.totalItems');
    expect(result).toHaveProperty('meta.itemCount');
    expect(result).toHaveProperty('meta.itemsPerPage');
    expect(result).toHaveProperty('meta.totalPages');
    expect(result).toHaveProperty('meta.currentPage');
  });
  /* searchisbn 오류..--------------------------------------------------------------------------------
  it('createBookInfo isbn is in naver, but not in our DB ', async () => {
    const isbn = '9791160502152';
    const result = await BooksService.createBookInfo(isbn);

    // check property
    expect(result).toHaveProperty('isbnInNaver');
    expect(result).toHaveProperty('isbnInBookInfo');
    expect(result).toHaveProperty('sameTitleOrAuthor');
  }); */

  it('SortInfo with valid inputs', async () => {
    const sort = 'new';
    const limit = 3;
    const result = await BooksService.sortInfo(limit, sort);

    expect(result).toHaveProperty('items[0].id');
    expect(result).toHaveProperty('items[0].title');
    expect(result).toHaveProperty('items[0].author');
    expect(result).toHaveProperty('items[0].publisher');
    expect(result).toHaveProperty('items[0].isbn');
    expect(result).toHaveProperty('items[0].image');
    expect(result).toHaveProperty('items[0].category');
    expect(result).toHaveProperty('items[0].publishedAt');
    expect(result).toHaveProperty('items[0].createdAt');
    expect(result).toHaveProperty('items[0].updatedAt');
    expect(result).toHaveProperty('items[0].lendingCnt');
  });

  it('SortInfo with valid inputs', async () => {
    const id = '12';
    const result = await BooksService.getInfo(id);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('title');
    expect(result).toHaveProperty('author');
    expect(result).toHaveProperty('publisher');
    expect(result).toHaveProperty('isbn');
    expect(result).toHaveProperty('image');
    expect(result).toHaveProperty('category');
    expect(result).toHaveProperty('publishedAt');
    expect(result).toHaveProperty('books[0].id');
    expect(result).toHaveProperty('books[0].callSign');
    expect(result).toHaveProperty('books[0].donator');
    expect(result).toHaveProperty('books[0].dueDate');
    expect(result).toHaveProperty('books[0].isLendable');
  });
});
