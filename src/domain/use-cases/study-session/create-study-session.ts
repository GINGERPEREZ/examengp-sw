import { StudySessionRepository } from '../../repositories/study-session.repository';
import { StudySessionEntity } from '../../entities/study-session.entity';

export class CreateStudySession {
  constructor(private readonly studySessionRepository: StudySessionRepository) {}

  async execute(session: StudySessionEntity): Promise<StudySessionEntity> {
    return this.studySessionRepository.create(session);
  }
} 