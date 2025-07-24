export class CreateCategoryDto {
  private constructor(
    public readonly name: string,
    public readonly description?: string
  ) {}

  static create(props: {[key:string]: any}): [string?, CreateCategoryDto?] {
    const { name, description } = props;
    if (!name) return ['Missing required field: name'];
    return [undefined, new CreateCategoryDto(name, description)];
  }
} 