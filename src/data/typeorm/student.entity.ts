import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserTypeOrm } from './user.entity';

@Entity('students')
export class StudentTypeOrm {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => UserTypeOrm)
  @JoinColumn()
  user!: UserTypeOrm;
} 