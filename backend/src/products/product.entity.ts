import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';

import { CategoryEntity } from 'src/categories/category.entity';



@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('integer')
  price: number;

  @Column('integer', {default: 0})
  inStock: number;

  @Column({default: false})
  isStock: boolean;

  @Column({ nullable: true, default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGibpCfFFhT3_c7U5TKbpjT4WAqPuYv5DZ6Q&s' })
  imageUrl: string;

    // Связь: многие товары принадлежат одной категории
  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    onDelete: 'CASCADE', // При удалении категории, categoryId станет NULL
    nullable: true
  })
  @JoinColumn({ name: 'categoryId' }) // Явно указываем имя колонки в БД
  category: CategoryEntity;

  // Внешний ключ (создастся автоматически)
  @Column({ nullable: true })
  categoryId: number;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}