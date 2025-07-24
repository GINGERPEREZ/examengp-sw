export class UpdateStudentDto {
  private constructor(
    public readonly id: number,
    public readonly userId?: number
  ) {}

  static create(props: {[key:string]: any}): [string?, UpdateStudentDto?] {
    const { id, userId } = props;
    if (!id) return ['Missing id'];
    return [undefined, new UpdateStudentDto(id, userId)];
  }
} 