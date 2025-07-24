import { StudySessionRepository } from '../../repositories/study-session.repository';
import { StudySessionEntity } from '../../entities/study-session.entity';

export class GetStudySessions {
  constructor(private readonly studySessionRepository: StudySessionRepository) {}

  async execute(): Promise<StudySessionEntity[]> {
    return this.studySessionRepository.findAll();
  }
} 