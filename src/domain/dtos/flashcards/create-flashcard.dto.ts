export class CreateFlashcardDto {
  private constructor(
    public readonly question: string,
    public readonly answer: string,
    public readonly categoryIds: number[],
    public readonly imageUrl?: string
  ) {}

  static create(props: {[key:string]: any}): [string?, CreateFlashcardDto?] {
    const { question, answer, imageUrl, categoryIds } = props;
    if (!question || !answer) return ['Missing required fields: question or answer'];
    if (!Array.isArray(categoryIds) || categoryIds.length === 0) return ['At least one category is required'];
    return [undefined, new CreateFlashcardDto(question, answer, categoryIds, imageUrl)];
  }
} 