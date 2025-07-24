export class UpdateUserDto {
  private constructor(
    public readonly id: number,
    public readonly name?: string,
    public readonly email?: string,
    public readonly password?: string
  ) {}

  static create(props: {[key:string]: any}): [string?, UpdateUserDto?] {
    const { id, name, email, password } = props;
    if (!id) return ['Missing id'];
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return ['Invalid email'];
    return [undefined, new UpdateUserDto(id, name, email, password)];
  }
} 