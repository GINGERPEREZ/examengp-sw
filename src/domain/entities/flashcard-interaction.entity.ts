export class FlashcardInteractionEntity {
  constructor(
    public readonly id: number,
    public readonly studySessionId: number,
    public readonly flashcardId: number,
    public readonly shownAt: Date,
    public readonly answered: boolean,
    public readonly correct: boolean,
    public readonly responseTime?: number
  ) {}

  static fromObject(obj: any): FlashcardInteractionEntity {
    return new FlashcardInteractionEntity(
      obj.id,
      obj.studySessionId,
      obj.flashcardId,
      new Date(obj.shownAt),
      obj.answered,
      obj.correct,
      obj.responseTime
    );
  }
} 