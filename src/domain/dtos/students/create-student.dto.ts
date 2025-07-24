export class CreateStudentDto {
  private constructor(
    public readonly userId: number
  ) {}

  static create(props: {[key:string]: any}): [string?, CreateStudentDto?] {
    const { userId } = props;
    if (!userId) return ['Missing required field: userId'];
    return [undefined, new CreateStudentDto(userId)];
  }
} 