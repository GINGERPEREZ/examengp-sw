import { FlashcardInteractionRepository } from '../../repositories/flashcard-interaction.repository';
import { FlashcardInteractionEntity } from '../../entities/flashcard-interaction.entity';

export class GetFlashcardInteractionsByFlashcard {
  constructor(private readonly flashcardInteractionRepository: FlashcardInteractionRepository) {}

  async execute(flashcardId: number): Promise<FlashcardInteractionEntity[]> {
    return this.flashcardInteractionRepository.findByFlashcard(flashcardId);
  }
} 