import { StudySessionRepository } from '../../repositories/study-session.repository';

export class DeleteStudySession {
  constructor(private readonly studySessionRepository: StudySessionRepository) {}

  async execute(id: number): Promise<void> {
    return this.studySessionRepository.delete(id);
  }
} 