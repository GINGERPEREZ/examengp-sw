# Flashcards API

API RESTful para la gestión de usuarios, flashcards, categorías, sesiones de estudio e interacciones, siguiendo arquitectura limpia y usando TypeORM + PostgreSQL.

---

## Requisitos

- Node.js >= 18
- Docker y Docker Compose (para la base de datos)
- PostgreSQL (si no usas Docker, puedes usar tu propia instancia)

---

## 1. Clonar el repositorio

```bash
git clone <url-del-repo>
cd <nombre-del-repo>
```

---

## 2. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
PORT=3000
PUBLIC_PATH=public
POSTGRES_URL=postgres://postgres:postgres@localhost:5432/flashcardsdb
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=flashcardsdb
```

> **Nota:**  
> - Cambia los valores si lo necesitas.  
> - Si usas Docker, los valores por defecto (`postgres`/`postgres`/`flashcardsdb`) funcionarán.

---

## 3. Levantar la base de datos con Docker

```bash
docker-compose up -d
```

Esto levantará un contenedor de PostgreSQL en el puerto 5432.

---

## 4. Instalar dependencias

```bash
npm install
```

---

## 5. Compilar el proyecto

```bash
npm run build
```

---

## 6. Iniciar el servidor

```bash
npm start
```

El servidor quedará corriendo en `http://localhost:3000`.

---

## 7. Documentación interactiva (Swagger)

Accede a la documentación y prueba la API desde tu navegador en:

```
http://localhost:3000/api-docs
```

---

## 8. Endpoints principales

- `/api/users` - CRUD de usuarios
- `/api/categories` - CRUD de categorías
- `/api/flashcards` - CRUD de flashcards
- `/api/students` - CRUD de estudiantes
- `/api/study-sessions` - CRUD de sesiones de estudio
- `/api/study-sessions/{id}/flashcards` - Flashcards de la sesión
- `/api/flashcard-interactions` - Registro y consulta de interacciones

Consulta Swagger para detalles de cada endpoint, parámetros y ejemplos de request/response.

---

## 9. Notas

- Las tablas se crean automáticamente al iniciar el servidor (`synchronize: true` en TypeORM).
- Puedes modificar la configuración de la base de datos en el archivo `.env`.
- Para desarrollo, puedes limpiar la base de datos borrando el volumen `./postgres` y reiniciando Docker.

--- 