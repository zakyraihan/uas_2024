import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Produk {
  @PrimaryGeneratedColumn()
  ProdukID: number;

  @Column()
  NamaProduk: string;

  @Column('decimal', { precision: 10, scale: 2 })
  Harga: number;

  @Column()
  Stok: number;
}
