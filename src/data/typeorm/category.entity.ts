import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('categories')
@Unique(['name'])
export class CategoryTypeOrm {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  name!: string;

  @Column('varchar', { nullable: true })
  description?: string;
} 