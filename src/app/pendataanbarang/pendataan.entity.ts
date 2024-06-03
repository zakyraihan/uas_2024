import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Barang {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama: string;

  @Column()
  jumlah: number;

  @Column()
  jenis: string;

  @Column()
  kondisi: string;
}
