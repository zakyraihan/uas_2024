import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ResponsePagination, ResponseSuccess } from 'src/interface';
import { title } from 'process';
import {
  CreateArrayDto,
  CreateBookDto,
  DeleteArrayDto,
  FindBookDto,
  UpdateBookDto,
} from './book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Between, Like, Repository } from 'typeorm';
import BaseResponse from 'src/utils/response/base.response';

@Injectable()
export class BookService extends BaseResponse {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {
    super();
  }

  private books: {
    id?: number;
    title: string;
    author: string;
    year: number;
  }[] = [
    {
      id: 1,
      title: 'nextjs',
      author: 'zahid maulana',
      year: 2023,
    },
  ];

  async getAllBook(findBookDto: FindBookDto): Promise<ResponsePagination> {
    const { page, pageSize, title, author, from_year, to_year, limit } =
      findBookDto;

    const filter: {
      [key: string]: any;
    } = {};

    if (title) {
      filter.title = Like(`%${title}%`);
    }
    if (author) {
      filter.author = Like(`%${author}%`);
    }

    if (from_year && to_year) {
      filter.year = Between(from_year, to_year);
    }

    if (from_year && !!to_year === false) {
      filter.year = Between(from_year, from_year);
    }

    console.log('filter', filter);

    const total = await this.bookRepository.count({
      where: filter,
    });
    const book = await this.bookRepository.find({
      where: filter,
      skip: limit,
      take: pageSize,
    });
    return this._pagination('berhasil', book, total, page, pageSize);
    return {
      status: 'ok',
      message: 'berhasil hehe',
      data: book,
      pagination: {
        total: total,
        total_page: Math.ceil(total / pageSize),
        page: page,
        pageSize: pageSize,
      },
    };
  }

  async createBook(payload: CreateBookDto): Promise<ResponseSuccess> {
    try {
      console.log('pay', payload);
      const { title, author, year } = payload;

      const bookSave = await this.bookRepository.save({
        title: title,
        author: author,
        year: year,
      });

      return this._success('berhasil ya', bookSave);
      return {
        status: 'ok',
        message: 'berhasil',
        data: bookSave,
      };
    } catch {
      console.log('masuk sini');
      throw new HttpException('ada kesalahan', HttpStatus.BAD_REQUEST);
    }
  }

  async getDetail(id: number): Promise<ResponseSuccess> {
    const book = await this.bookRepository.findOne({
      where: {
        id: id,
      },
    });
    console.log('book', book);

    if (book == null) {
      throw new NotFoundException(
        `Buku dengan id ${id} tidak ditemukan lagiiiiiii`,
      );
    }
    return {
      status: 'ok',
      message: 'berhasil',
      data: book,
    };
  }

  async updateBook(
    id: number,
    payload: UpdateBookDto,
  ): Promise<ResponseSuccess> {
    const { title, author, year } = payload;

    const book = await this.bookRepository.findOne({
      where: {
        id: id,
      },
    });

    if (book == null) {
      throw new NotFoundException(`buku dengan ${id} tidak nemu`);
    }
    const update = await this.bookRepository.save({ ...payload, id: id });

    return {
      status: 'ok',
      message: 'berhasil memperbarui buku',
      data: update,
    };
  }

  async deleteBook(id: number): Promise<ResponseSuccess> {
    const book = await this.bookRepository.findOne({
      where: {
        id: id,
      },
    });

    if (book == null) {
      throw new NotFoundException(`buku dengan ${id} tidak ditemukan`);
    }

    const deleteBook = await this.bookRepository.delete(id);

    return {
      status: 'ok',
      message: 'berhasil menghapus buku',
      data: deleteBook,
    };
  }

  private findBookById(id: number) {
    const bookIndex = this.books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      throw new NotFoundException(`buku dengan ${id} tidak ditemukan `);
    }
    return bookIndex;
  }

  async bulkCreate(payload: CreateArrayDto): Promise<ResponseSuccess> {
    console.log('pay', payload);
    try {
      let berhasil = 0;
      let gagal = 0;
      await Promise.all(
        payload.data.map(async (item) => {
          try {
            await this.bookRepository.save(item);
            berhasil = berhasil + 1;
          } catch {
            gagal = gagal + 1;
          }
        }),
      );

      return {
        status: 'ok',
        message: `berhasil menambah buku sebanyak ${berhasil} dan gagal sebanyak ${gagal}`,
        data: payload,
      };
    } catch {
      throw new HttpException('Ada Kesalahan muuuuuuu', HttpStatus.BAD_REQUEST);
    }
  }

  async bulkDelete(payload: DeleteArrayDto): Promise<ResponseSuccess> {
    console.log('pay', payload);
    try {
      let berhasil = 0;
      let gagal = 0;
      await Promise.all(
        payload.delete.map(async (id) => {
          try {
            const del = await this.bookRepository.delete(id);

            if (del.affected === 1) {
              berhasil = berhasil + 1;
            } else {
              gagal = gagal + 1;
            }
          } catch {
            gagal = gagal + 1;
          }
        }),
      );

      return {
        status: 'ok',
        message: `Berhasil menghapus kitab  ${berhasil} dan gagal ${gagal}`,
        data: payload,
      };
    } catch {
      throw new HttpException('Ada Kesalahan', HttpStatus.BAD_REQUEST);
    }
  }
}
