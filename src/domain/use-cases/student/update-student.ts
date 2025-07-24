import { StudentRepository } from '../../repositories/student.repository';
import { StudentEntity } from '../../entities/student.entity';

export class UpdateStudent {
  constructor(private readonly studentRepository: StudentRepository) {}

  async execute(student: StudentEntity): Promise<StudentEntity> {
    return this.studentRepository.update(student);
  }
} 