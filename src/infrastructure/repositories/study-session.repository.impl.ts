import { StudySessionRepository } from '../../domain/repositories/study-session.repository';
import { StudySessionEntity } from '../../domain/entities/study-session.entity';
import { StudySessionDatasource } from '../../domain/datasources/study-session.datasource';

export class StudySessionRepositoryImpl implements StudySessionRepository {
  constructor(private readonly datasource: StudySessionDatasource) {}

  create(session: StudySessionEntity): Promise<StudySessionEntity> {
    return this.datasource.create(session);
  }
  update(session: StudySessionEntity): Promise<StudySessionEntity> {
    return this.datasource.update(session);
  }
  delete(id: number): Promise<void> {
    return this.datasource.delete(id);
  }
  findById(id: number): Promise<StudySessionEntity | null> {
    return this.datasource.findById(id);
  }
  findByStudent(studentId: number): Promise<StudySessionEntity[]> {
    return this.datasource.findByStudent(studentId);
  }
  findAll(): Promise<StudySessionEntity[]> {
    return this.datasource.findAll();
  }
} 