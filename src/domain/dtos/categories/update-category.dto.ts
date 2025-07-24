export class UpdateCategoryDto {
  private constructor(
    public readonly id: number,
    public readonly name?: string,
    public readonly description?: string
  ) {}

  static create(props: {[key:string]: any}): [string?, UpdateCategoryDto?] {
    const { id, name, description } = props;
    if (!id) return ['Missing id'];
    return [undefined, new UpdateCategoryDto(id, name, description)];
  }
} 