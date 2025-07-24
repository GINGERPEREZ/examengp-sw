import { FlashcardInteractionRepository } from '../../repositories/flashcard-interaction.repository';
import { FlashcardInteractionEntity } from '../../entities/flashcard-interaction.entity';

export class GetFlashcardInteractionsBySession {
  constructor(private readonly flashcardInteractionRepository: FlashcardInteractionRepository) {}

  async execute(studySessionId: number): Promise<FlashcardInteractionEntity[]> {
    return this.flashcardInteractionRepository.findByStudySession(studySessionId);
  }
} 