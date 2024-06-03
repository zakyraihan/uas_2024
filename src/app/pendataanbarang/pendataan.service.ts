import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Barang } from './pendataan.entity';
import { CreateBarangDto } from './pendataan.dto';

@Injectable()
export class PendataanBarangService {
  constructor(
    @InjectRepository(Barang)
    private barangRepository: Repository<Barang>,
  ) {}

  findAll(): Promise<Barang[]> {
    return this.barangRepository.find();
  }

  findOne(id: string): Promise<Barang> {
    return this.barangRepository.findOneBy({ id: Number(id) });
  }

  create(createBarangDto: CreateBarangDto): Promise<Barang> {
    const barang = new Barang();
    barang.nama = createBarangDto.nama;
    barang.jumlah = createBarangDto.jumlah;
    barang.jenis = createBarangDto.jenis;
    barang.kondisi = createBarangDto.kondisi;

    return this.barangRepository.save(barang);
  }

  async update(id: string, updateBarangDto: CreateBarangDto): Promise<Barang> {
    const barang = await this.barangRepository.findOneBy({ id: Number(id) });
    if (!barang) {
      throw new Error('Barang not found');
    }
    barang.nama = updateBarangDto.nama;
    barang.jumlah = updateBarangDto.jumlah;
    barang.jenis = updateBarangDto.jenis;
    barang.kondisi = updateBarangDto.kondisi;

    return this.barangRepository.save(barang);
  }

  async remove(id: string): Promise<void> {
    await this.barangRepository.delete(Number(id));
  }
}
