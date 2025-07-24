import { StudentRepository } from '../../domain/repositories/student.repository';
import { StudentEntity } from '../../domain/entities/student.entity';
import { StudentDatasource } from '../../domain/datasources/student.datasource';

export class StudentRepositoryImpl implements StudentRepository {
  constructor(private readonly datasource: StudentDatasource) {}

  create(student: StudentEntity): Promise<StudentEntity> {
    return this.datasource.create(student);
  }
  update(student: StudentEntity): Promise<StudentEntity> {
    return this.datasource.update(student);
  }
  delete(id: number): Promise<void> {
    return this.datasource.delete(id);
  }
  findById(id: number): Promise<StudentEntity | null> {
    return this.datasource.findById(id);
  }
  findByUserId(userId: number): Promise<StudentEntity | null> {
    return this.datasource.findByUserId(userId);
  }
  findAll(): Promise<StudentEntity[]> {
    return this.datasource.findAll();
  }
} 