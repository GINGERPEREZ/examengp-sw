import { CategoryEntity } from './category.entity';

export class FlashcardEntity {
  constructor(
    public readonly id: number,
    public readonly question: string,
    public readonly answer: string,
    public readonly imageUrl: string | null,
    public readonly createdBy: number,
    public readonly categories: CategoryEntity[]
  ) {}

  static fromObject(obj: any): FlashcardEntity {
    return new FlashcardEntity(
      obj.id,
      obj.question,
      obj.answer,
      obj.imageUrl ?? null,
      obj.createdBy,
      obj.categories?.map((c: any) => CategoryEntity.fromObject(c)) ?? []
    );
  }
} 