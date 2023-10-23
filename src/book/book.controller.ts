import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateArrayDto, CreateBookDto, FindBookDto, UpdateBookDto } from './book.dto';
import { Pagination } from 'src/utils/decorator/pagination.decorator';

@Controller('book')
export class BookController {
    constructor (private bookService : BookService) {}

    @Get('list')
    getAllBook(@Pagination() findBookDto:FindBookDto){
        console.log('findbookdto',findBookDto);
        return this.bookService.getAllBook(findBookDto);
    }

    @Post('create')
    createBook(@Body() payload:CreateBookDto){
        console.log('payload', payload)
        return this.bookService.createBook(payload);
    }

    @Put('update/:id')
    updateBook(@Param('id') id:string, @Body() payload:UpdateBookDto) {
        return this.bookService.updateBook(Number(id), payload);
    }

    @Get('detail/:id')
    getDetail(@Param('id') id:string ){
        return this.bookService.getDetail(Number(id));
    }

    
    @Delete('delete/:id')
    deleteBook(@Param('id') id:string ){
        return this.bookService.deleteBook(+id)
    }

    @Post('create/bulk')
    createBulk(@Body() payload:CreateArrayDto){
        console.log('pay',payload)
        return this.bookService.bulkCreate(payload);
    }

    // @Post('delete/bulk')
    // deleteBook(@Param('id') id:string){
    //     return
    // }
    


}

const array = [
    {
        id : 1,
    },
    {
        id : 2,
    },
    {
        id: 3,
    }
]