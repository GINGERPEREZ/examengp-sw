import { Request, Response } from 'express';
import { CreateFlashcardInteraction, GetFlashcardInteractions, GetFlashcardInteractionsBySession, GetFlashcardInteractionsByFlashcard, FlashcardInteractionRepository } from '../../domain';
import { CreateFlashcardInteractionDto } from '../../domain/dtos';

export class FlashcardInteractionsController {
  constructor(private readonly flashcardInteractionRepository: FlashcardInteractionRepository) {}

  public getInteractions = async (req: Request, res: Response) => {
    const { studySessionId, flashcardId } = req.query;
    if (studySessionId) {
      const interactions = await new GetFlashcardInteractionsBySession(this.flashcardInteractionRepository).execute(Number(studySessionId));
      return res.json(interactions);
    }
    if (flashcardId) {
      const interactions = await new GetFlashcardInteractionsByFlashcard(this.flashcardInteractionRepository).execute(Number(flashcardId));
      return res.json(interactions);
    }
    const interactions = await new GetFlashcardInteractions(this.flashcardInteractionRepository).execute();
    res.json(interactions);
  };

  public createInteraction = async (req: Request, res: Response) => {
    const [error, dto] = CreateFlashcardInteractionDto.create(req.body);
    if (error || !dto) return res.status(400).json({ error: error || 'Invalid data' });
    const interaction = await new CreateFlashcardInteraction(this.flashcardInteractionRepository).execute(dto! as any);
    res.status(201).json(interaction);
  };
} 