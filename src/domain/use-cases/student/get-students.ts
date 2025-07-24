import { StudentRepository } from '../../repositories/student.repository';
import { StudentEntity } from '../../entities/student.entity';

export class GetStudents {
  constructor(private readonly studentRepository: StudentRepository) {}

  async execute(): Promise<StudentEntity[]> {
    return this.studentRepository.findAll();
  }
} 