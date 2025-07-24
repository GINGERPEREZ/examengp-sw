import { StudentRepository } from '../../repositories/student.repository';
import { StudentEntity } from '../../entities/student.entity';

export class GetStudent {
  constructor(private readonly studentRepository: StudentRepository) {}

  async execute(id: number): Promise<StudentEntity | null> {
    return this.studentRepository.findById(id);
  }
} 