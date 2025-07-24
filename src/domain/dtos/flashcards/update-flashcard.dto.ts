export class UpdateFlashcardDto {
  private constructor(
    public readonly id: number,
    public readonly question?: string,
    public readonly answer?: string,
    public readonly imageUrl?: string,
    public readonly categoryIds?: number[]
  ) {}

  static create(props: {[key:string]: any}): [string?, UpdateFlashcardDto?] {
    const { id, question, answer, imageUrl, categoryIds } = props;
    if (!id) return ['Missing id'];
    return [undefined, new UpdateFlashcardDto(id, question, answer, imageUrl, categoryIds)];
  }
} 