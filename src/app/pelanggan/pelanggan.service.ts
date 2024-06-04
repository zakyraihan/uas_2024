import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Pelanggan } from './pelanggan.entity';
import {
  CreatePelangganDto,
  UpdatePelangganDto,
  findAllTugas,
} from './pelanggan.dto';
import { ResponsePagination, ResponseSuccess } from 'src/interface';
import BaseResponse from 'src/utils/response/base.response';

@Injectable()
export class PelangganService extends BaseResponse {
  constructor(
    @InjectRepository(Pelanggan)
    private pelangganRepository: Repository<Pelanggan>,
  ) {
    super();
  }

  findAll(): Promise<Pelanggan[]> {
    return this.pelangganRepository.find();
  }

  async findOne(id: number): Promise<Pelanggan> {
    const pelanggan = await this.pelangganRepository.findOne({
      where: { pelangganID: id },
    });
    if (!pelanggan) {
      throw new NotFoundException(`Pelanggan with ID ${id} not found`);
    }
    return pelanggan;
  }

  create(createPelangganDto: CreatePelangganDto): Promise<Pelanggan> {
    const pelanggan = this.pelangganRepository.create(createPelangganDto);
    return this.pelangganRepository.save(pelanggan);
  }

  async update(
    id: number,
    updatePelangganDto: UpdatePelangganDto,
  ): Promise<ResponseSuccess> {
    const check = await this.pelangganRepository.find({
      where: {
        pelangganID: id,
      },
    });
    if (!check) {
      throw new NotFoundException(`Pelanggan with Id`);
    }
    const result = await this.pelangganRepository.update(
      id,
      updatePelangganDto,
    );

    return this._success('berhasil', result);
  }

  async remove(id: number): Promise<void> {
    const result = await this.pelangganRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Pelanggan with ID ${id} not found`);
    }
  }

  async getList(query: findAllTugas): Promise<ResponsePagination> {
    const { page, pageSize, limit, namaPelanggan } = query;

    const filterQuery: any = {};
    if (namaPelanggan) {
      filterQuery.namaPelanggan = Like(`%${namaPelanggan}%`);
    }

    const total = await this.pelangganRepository.count({ where: filterQuery });

    console.log('Qwery', filterQuery);

    const result = await this.pelangganRepository.find({
      where: filterQuery,
      select: {
        pelangganID: true,
        namaPelanggan: true,
        alamat: true,
        nomorTelepon: true,
        create_at: true,
        updated_at: true,
      },
      skip: limit,
      take: pageSize,
    });

    return this._pagination('Okeh', result, total, page, pageSize);
  }
}
