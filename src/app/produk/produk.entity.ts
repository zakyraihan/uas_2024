import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
