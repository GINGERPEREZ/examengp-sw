export class CreateUserDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(props: {[key:string]: any}): [string?, CreateUserDto?] {
    const { name, email, password } = props;
    if (!name || !email || !password) return ['Missing required fields'];
    // Validación simple de email
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return ['Invalid email'];
    return [undefined, new CreateUserDto(name, email, password)];
  }
} 