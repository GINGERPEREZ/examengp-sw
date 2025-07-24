-- Usuarios
INSERT INTO users (id, name, email, password) VALUES
  (1, 'Juan Perez', 'juan@email.com', '1234'),
  (2, 'Ana Lopez', 'ana@email.com', 'abcd');

-- Categorías
INSERT INTO categories (id, name, description) VALUES
  (1, 'Ciencia', 'Tarjetas de ciencia'),
  (2, 'Historia', 'Tarjetas de historia');

-- Estudiantes (asociados a usuarios)
INSERT INTO students (id, userId) VALUES
  (1, 1),
  (2, 2);

-- Flashcards
INSERT INTO flashcards (id, question, answer, imageUrl, "createdById") VALUES
  (1, '¿Capital de Francia?', 'París', NULL, 1),
  (2, '¿Quién descubrió América?', 'Cristóbal Colón', NULL, 2);

-- Relación flashcards-categorías (muchos a muchos)
INSERT INTO flashcard_categories (flashcardId, categoryId) VALUES
  (1, 1),
  (2, 2);

-- Sesiones de estudio
INSERT INTO study_sessions (id, studentId, categoryId, startedAt, endedAt) VALUES
  (1, 1, 1, NOW(), NULL),
  (2, 2, 2, NOW(), NULL);

-- Interacciones con flashcards
INSERT INTO flashcard_interactions (id, "studySessionId", "flashcardId", shownAt, answered, correct, responseTime) VALUES
  (1, 1, 1, NOW(), true, true, 10),
  (2, 2, 2, NOW(), true, false, 15); 