import { StudentRepository } from '../../repositories/student.repository';

export class DeleteStudent {
  constructor(private readonly studentRepository: StudentRepository) {}

  async execute(id: number): Promise<void> {
    return this.studentRepository.delete(id);
  }
} 