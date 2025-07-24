import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { StudentTypeOrm } from './student.entity';
import { CategoryTypeOrm } from './category.entity';

@Entity('study_sessions')
export class StudySessionTypeOrm {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => StudentTypeOrm, { nullable: false })
  student!: StudentTypeOrm;

  @ManyToOne(() => CategoryTypeOrm, { nullable: false })
  category!: CategoryTypeOrm;

  @CreateDateColumn()
  startedAt!: Date;

  @UpdateDateColumn({ nullable: true })
  endedAt?: Date;
} 