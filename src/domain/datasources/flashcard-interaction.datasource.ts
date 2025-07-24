import { FlashcardInteractionEntity } from '../entities/flashcard-interaction.entity';

export interface FlashcardInteractionDatasource {
  create(interaction: FlashcardInteractionEntity): Promise<FlashcardInteractionEntity>;
  findByStudySession(studySessionId: number): Promise<FlashcardInteractionEntity[]>;
  findByFlashcard(flashcardId: number): Promise<FlashcardInteractionEntity[]>;
  findAll(): Promise<FlashcardInteractionEntity[]>;
} 