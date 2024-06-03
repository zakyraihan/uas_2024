import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pembelian {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama: string;

  @Column()
  deskripsi: string;

  @Column('decimal')
  harga: number;

  @Column()
  stok: number;
}
