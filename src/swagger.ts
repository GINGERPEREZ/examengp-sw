import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Flashcards API',
      version: '1.0.0',
      description: 'API para gestión de usuarios, flashcards, categorías, sesiones de estudio e interacciones.'
    },
    servers: [
      { url: 'http://localhost:3000/api', description: 'Servidor local' }
    ]
  },
  apis: ['./src/presentation/**/*.ts'], // Puedes agregar anotaciones JSDoc en tus controladores
}); 