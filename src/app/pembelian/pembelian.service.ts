import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pembelian } from './pembelian.entity';
import { CreatePembelianDto } from './pembelian.dto';

@Injectable()
export class PembelianService {
  constructor(
    @InjectRepository(Pembelian)
    private pembelianRepository: Repository<Pembelian>,
  ) {}

  findAll(): Promise<Pembelian[]> {
    return this.pembelianRepository.find();
  }

  async findOne(id: number): Promise<Pembelian> {
    const pembelian = await this.pembelianRepository.findOneBy({ id });
    if (!pembelian) {
      throw new NotFoundException(`Pembelian with ID ${id} not found`);
    }
    return pembelian;
  }

  async create(createPembelianDto: CreatePembelianDto): Promise<Pembelian> {
    const pembelian = this.pembelianRepository.create(createPembelianDto);
    return this.pembelianRepository.save(pembelian);
  }

  async update(
    id: number,
    updatePembelianDto: CreatePembelianDto,
  ): Promise<Pembelian> {
    await this.pembelianRepository.update(id, updatePembelianDto);
    const updatedPembelian = await this.pembelianRepository.findOneBy({ id });
    if (!updatedPembelian) {
      throw new NotFoundException(`Pembelian with ID ${id} not found`);
    }
    return updatedPembelian;
  }

  async remove(id: number): Promise<void> {
    const pembelian = await this.findOne(id);
    await this.pembelianRepository.remove(pembelian);
  }
}
