import { StudentRepository } from '../../repositories/student.repository';
import { StudentEntity } from '../../entities/student.entity';

export class CreateStudent {
  constructor(private readonly studentRepository: StudentRepository) {}

  async execute(student: StudentEntity): Promise<StudentEntity> {
    return this.studentRepository.create(student);
  }
} 