export class UserEntity {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  static fromObject(obj: any): UserEntity {
    return new UserEntity(
      obj.id,
      obj.name,
      obj.email,
      obj.password
    );
  }
} 