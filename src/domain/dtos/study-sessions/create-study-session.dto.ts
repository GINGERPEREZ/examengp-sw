export class CreateStudySessionDto {
  private constructor(
    public readonly studentId: number,
    public readonly categoryId: number
  ) {}

  static create(props: {[key:string]: any}): [string?, CreateStudySessionDto?] {
    const { studentId, categoryId } = props;
    if (!studentId || !categoryId) return ['Missing required fields: studentId or categoryId'];
    return [undefined, new CreateStudySessionDto(studentId, categoryId)];
  }
} 