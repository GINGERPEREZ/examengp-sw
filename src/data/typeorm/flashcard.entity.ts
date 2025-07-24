import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { CategoryTypeOrm } from './category.entity';
import { UserTypeOrm } from './user.entity';

@Entity('flashcards')
export class FlashcardTypeOrm {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  question!: string;

  @Column('varchar')
  answer!: string;

  @Column('varchar', { nullable: true })
  imageUrl?: string;

  @ManyToOne(() => UserTypeOrm, { nullable: false })
  createdBy!: UserTypeOrm;

  @ManyToMany(() => CategoryTypeOrm)
  @JoinTable({ name: 'flashcard_categories' })
  categories!: CategoryTypeOrm[];
} 