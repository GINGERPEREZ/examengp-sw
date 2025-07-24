import { Request, Response } from 'express';
import { CreateFlashcard, UpdateFlashcard, DeleteFlashcard, GetFlashcard, GetFlashcards, FlashcardRepository } from '../../domain';
import { CreateFlashcardDto, UpdateFlashcardDto } from '../../domain/dtos';
import { FlashcardEntity } from '../../domain/entities/flashcard.entity';
import { CategoryEntity } from '../../domain/entities/category.entity';

export class FlashcardsController {
  constructor(private readonly flashcardRepository: FlashcardRepository) {}

  public getFlashcards = async (req: Request, res: Response) => {
    const { categoryId } = req.query;
    if (categoryId) {
      const flashcards = await this.flashcardRepository.findByCategory(Number(categoryId));
      return res.json(flashcards);
    }
    const flashcards = await new GetFlashcards(this.flashcardRepository).execute();
    res.json(flashcards);
  };

  public getFlashcardById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const flashcard = await new GetFlashcard(this.flashcardRepository).execute(id);
    if (!flashcard) return res.status(404).json({ error: 'Flashcard not found' });
    res.json(flashcard);
  };

  public createFlashcard = async (req: Request, res: Response) => {
    const [error, dto] = CreateFlashcardDto.create(req.body);
    if (error || !dto) return res.status(400).json({ error: error || 'Invalid data' });
    // Pobla categories como array de objetos { id }
    const entity = FlashcardEntity.fromObject({
      ...dto,
      categories: dto.categoryIds.map((id: number) => new CategoryEntity(id, '', ''))
    });
    const flashcard = await new CreateFlashcard(this.flashcardRepository).execute(entity);
    res.status(201).json(flashcard);
  };

  public updateFlashcard = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const [error, dto] = UpdateFlashcardDto.create({ ...req.body, id });
    if (error || !dto) return res.status(400).json({ error: error || 'Invalid data' });
    // Pobla categories si categoryIds está presente
    let entity;
    if (dto.categoryIds) {
      entity = FlashcardEntity.fromObject({
        ...dto,
        categories: dto.categoryIds.map((catId: number) => new CategoryEntity(catId, '', ''))
      });
    } else {
      entity = FlashcardEntity.fromObject(dto);
    }
    const flashcard = await new UpdateFlashcard(this.flashcardRepository).execute(entity);
    res.json(flashcard);
  };

  public deleteFlashcard = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await new DeleteFlashcard(this.flashcardRepository).execute(id);
    res.status(204).send();
  };
} 