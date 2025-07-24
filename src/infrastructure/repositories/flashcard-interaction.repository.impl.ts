import { FlashcardInteractionRepository } from '../../domain/repositories/flashcard-interaction.repository';
import { FlashcardInteractionEntity } from '../../domain/entities/flashcard-interaction.entity';
import { FlashcardInteractionDatasource } from '../../domain/datasources/flashcard-interaction.datasource';

export class FlashcardInteractionRepositoryImpl implements FlashcardInteractionRepository {
  constructor(private readonly datasource: FlashcardInteractionDatasource) {}

  create(interaction: FlashcardInteractionEntity): Promise<FlashcardInteractionEntity> {
    return this.datasource.create(interaction);
  }
  findByStudySession(studySessionId: number): Promise<FlashcardInteractionEntity[]> {
    return this.datasource.findByStudySession(studySessionId);
  }
  findByFlashcard(flashcardId: number): Promise<FlashcardInteractionEntity[]> {
    return this.datasource.findByFlashcard(flashcardId);
  }
  findAll(): Promise<FlashcardInteractionEntity[]> {
    return this.datasource.findAll();
  }
} 