import { FlashcardInteractionRepository } from '../../repositories/flashcard-interaction.repository';
import { FlashcardInteractionEntity } from '../../entities/flashcard-interaction.entity';

export class CreateFlashcardInteraction {
  constructor(private readonly flashcardInteractionRepository: FlashcardInteractionRepository) {}

  async execute(interaction: FlashcardInteractionEntity): Promise<FlashcardInteractionEntity> {
    return this.flashcardInteractionRepository.create(interaction);
  }
} 