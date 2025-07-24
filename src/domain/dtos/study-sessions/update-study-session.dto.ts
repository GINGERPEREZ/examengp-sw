export class UpdateStudySessionDto {
  private constructor(
    public readonly id: number,
    public readonly endedAt?: Date,
    public readonly categoryId?: number
  ) {}

  static create(props: {[key:string]: any}): [string?, UpdateStudySessionDto?] {
    const { id, endedAt, categoryId } = props;
    if (!id) return ['Missing id'];
    return [undefined, new UpdateStudySessionDto(id, endedAt ? new Date(endedAt) : undefined, categoryId)];
  }
} 