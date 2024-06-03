import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StokBarang } from './stok.entity';
import { CreateStokBarangDto, UpdateStokBarangDto } from './stok.dto';

@Injectable()
export class StokBarangService {
  constructor(
    @InjectRepository(StokBarang)
    private readonly stokBarangRepository: Repository<StokBarang>,
  ) {}

  findAll(): Promise<StokBarang[]> {
    return this.stokBarangRepository.find();
  }

  findOne(id: number): Promise<StokBarang> {
    return this.stokBarangRepository.findOneBy({ Idbarang: id });
  }

  create(createStokBarangDto: CreateStokBarangDto): Promise<StokBarang> {
    const stokBarang = this.stokBarangRepository.create(createStokBarangDto);
    return this.stokBarangRepository.save(stokBarang);
  }

  async update(
    id: number,
    updateStokBarangDto: UpdateStokBarangDto,
  ): Promise<StokBarang> {
    await this.stokBarangRepository.update(id, updateStokBarangDto);
    return this.stokBarangRepository.findOneBy({ Idbarang: id });
  }

  async remove(id: number) {
    const data = await this.stokBarangRepository.delete(id);
    return {
      messege: 'data berhasil di hapus',
      data: data,
    };
  }
}
