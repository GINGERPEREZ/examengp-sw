import { StudentEntity } from '../entities/student.entity';

export interface StudentRepository {
  create(student: StudentEntity): Promise<StudentEntity>;
  update(student: StudentEntity): Promise<StudentEntity>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<StudentEntity | null>;
  findByUserId(userId: number): Promise<StudentEntity | null>;
  findAll(): Promise<StudentEntity[]>;
} 