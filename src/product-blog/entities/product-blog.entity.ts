import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product_blogs')
export class ProductBlogEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  content!: string;

  @Column({ name: 'product_id' })
  productId!: string;

  @Column({ name: 'product_channel' })
  productChannel: string;

  @Column()
  published!: boolean;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;
}
