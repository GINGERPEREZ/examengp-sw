export class CreateFlashcardInteractionDto {
  private constructor(
    public readonly studySessionId: number,
    public readonly flashcardId: number,
    public readonly answered: boolean,
    public readonly correct: boolean,
    public readonly responseTime?: number
  ) {}

  static create(props: {[key:string]: any}): [string?, CreateFlashcardInteractionDto?] {
    const { studySessionId, flashcardId, answered, correct, responseTime } = props;
    if (!studySessionId || !flashcardId || answered === undefined || correct === undefined)
      return ['Missing required fields'];
    return [undefined, new CreateFlashcardInteractionDto(studySessionId, flashcardId, answered, correct, responseTime)];
  }
} 