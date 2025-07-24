export class CategoryEntity {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description?: string
  ) {}

  static fromObject(obj: any): CategoryEntity {
    return new CategoryEntity(
      obj.id,
      obj.name,
      obj.description
    );
  }
} 