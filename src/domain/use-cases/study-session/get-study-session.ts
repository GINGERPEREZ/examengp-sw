import { StudySessionRepository } from '../../repositories/study-session.repository';
import { StudySessionEntity } from '../../entities/study-session.entity';

export class GetStudySession {
  constructor(private readonly studySessionRepository: StudySessionRepository) {}

  async execute(id: number): Promise<StudySessionEntity | null> {
    return this.studySessionRepository.findById(id);
  }
} 