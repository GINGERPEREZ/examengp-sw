import { FlashcardInteractionRepository } from '../../repositories/flashcard-interaction.repository';
import { FlashcardInteractionEntity } from '../../entities/flashcard-interaction.entity';

export class GetFlashcardInteractions {
  constructor(private readonly flashcardInteractionRepository: FlashcardInteractionRepository) {}

  async execute(): Promise<FlashcardInteractionEntity[]> {
    return this.flashcardInteractionRepository.findAll();
  }
} 