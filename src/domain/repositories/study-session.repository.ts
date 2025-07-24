import { StudySessionEntity } from '../entities/study-session.entity';

export interface StudySessionRepository {
  create(session: StudySessionEntity): Promise<StudySessionEntity>;
  update(session: StudySessionEntity): Promise<StudySessionEntity>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<StudySessionEntity | null>;
  findByStudent(studentId: number): Promise<StudySessionEntity[]>;
  findAll(): Promise<StudySessionEntity[]>;
} 