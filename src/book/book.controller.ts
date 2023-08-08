import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
    constructor (private bookService : BookService) {}
    @Get('list')
    getAllBook(){
        return this.bookService.getAllBook();
    }

    @Post('create')
    createBook(@Body() payload:any){
        return this.bookService.createBook(payload);
    }
    



}
