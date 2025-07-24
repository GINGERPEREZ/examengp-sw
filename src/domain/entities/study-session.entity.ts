import { FlashcardEntity } from './flashcard.entity';

export class StudySessionEntity {
  constructor(
    public readonly id: number,
    public readonly studentId: number,
    public readonly categoryId: number,
    public readonly startedAt: Date,
    public readonly endedAt?: Date
  ) {}

  static fromObject(obj: any): StudySessionEntity {
    return new StudySessionEntity(
      obj.id,
      obj.studentId,
      obj.categoryId,
      new Date(obj.startedAt),
      obj.endedAt ? new Date(obj.endedAt) : undefined
    );
  }
} 