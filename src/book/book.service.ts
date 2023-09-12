import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ResponseSuccess } from 'src/interface';
import { title } from 'process';
import { CreateBookDto } from './book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  private books: {
    id?: number;
    title: string;
    author: string;
    year: number;
  }[] = [
    {
      id: 1,
      title: 'nextjs',
      author: 'fatih al hijri',
      year: 2023,
    },
  ];

  async getAllBook(): Promise<ResponseSuccess> {
    const book = await this.bookRepository.find();
    return {
      status: 'ok',
      message: 'berhasil',
      data: book,
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

  getDetail(id: number): {
    id?: number;
    title: string;
    author: string;
    year: number;
  } {
    const bookIndex = this.findBookById(id);
    console.log('book index', bookIndex);
    const book = this.books[bookIndex];

    return book;
  }

  updateBook(id: number, payload: any): ResponseSuccess {
    const { title, author, year } = payload;
    const bookIndex = this.findBookById(id);
    this.books[bookIndex].title = title;
    this.books[bookIndex].author = author;
    this.books[bookIndex].year = year;
    return {
      status: 'ok',
      message: 'berhasil memperbarui buku',
    };
  }

  deleteBook(id: number): ResponseSuccess {
    const bookIndex = this.findBookById(id);
    this.books.splice(bookIndex, 1);
    return {
      status: 'ok',
      message: 'berhasil menghapus buku',
    };
  }

  private findBookById(id: number) {
    const bookIndex = this.books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      throw new NotFoundException(`buku dengan ${id} tidak ditemukan `);
    }
    return bookIndex;
  }
}
