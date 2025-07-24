export class StudentEntity {
  constructor(
    public readonly id: number,
    public readonly userId: number
  ) {}

  static fromObject(obj: any): StudentEntity {
    return new StudentEntity(
      obj.id,
      obj.userId
    );
  }
} 