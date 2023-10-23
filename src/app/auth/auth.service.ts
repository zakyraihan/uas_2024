import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import BaseResponse from 'src/utils/response/base.response';
import { LoginDto, RegisterDto } from './auth.dto';
import { ResponseSuccess } from 'src/interface';
import { Repository } from 'typeorm';
import { User } from './auth.entity';
import { compare, hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService extends BaseResponse {
  constructor(
    @InjectRepository(User) private readonly authRepository: Repository<User>,
  ) {
    super();
  }
  async register(payload: RegisterDto): Promise<ResponseSuccess> {
    const checkUserExists = await this.authRepository.findOne({
      where: {
        email: payload.email,
      },
    });
    if (checkUserExists) {
      throw new HttpException('User already registered', HttpStatus.FOUND);
    }
    console.log('payload', payload);
    payload.password = await hash(payload.password, 12); //hash password
    await this.authRepository.save(payload);

    return this._success('Register Berhasil');
  }

  async login(payload:LoginDto):Promise <ResponseSuccess>{
    const checkUserExists = await this.authRepository.findOne({
        where:{
            email:payload.email,
        },
        select:{
            id:true,
            nama:true,
            email:true,
            password:true,
            refresh_token:true,
        },
    });
    if(!checkUserExists){
        throw new HttpException('user tidak ditemukan',HttpStatus.UNPROCESSABLE_ENTITY,);
    }
    const checkPassword = await compare(
        payload.password,
        checkUserExists.password,
    );// compare password yang dikirim dengan password yang ada di tabel
    if(checkPassword){
        return this._success('Login Succes',checkUserExists);
    } else {
        throw new HttpException(
            'email dan password tidak sama',
            HttpStatus.UNPROCESSABLE_ENTITY
        )
    }

  }
}
