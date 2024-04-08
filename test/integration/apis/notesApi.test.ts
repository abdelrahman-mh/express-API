import request from 'supertest';
import app from '../../../src/app';

// const api = request(app);

describe('Notes API Endpoints', () => {
   // Test for GET /notes
   describe('GET /api/notes', () => {
      //
   });
   it('should get all notes', async () => {
      const response = await request(app).get('/notes');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
   });

   // Test for GET /notes/:id
   it('should get a single note by id', async () => {
      const response = await request(app).get('/notes/1'); // Assuming note with id 1 exists
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(1); // Adjust this according to your data structure
   });

   // Test for POST /notes
   it('should add a new note', async () => {
      const newNote = { title: 'Test Note', content: 'Test Content' };
      const response = await request(app).post('/notes').send(newNote);
      expect(response.status).toBe(201);
      expect(response.body.title).toBe(newNote.title);
      expect(response.body.content).toBe(newNote.content);
   });

   // Test for DELETE /notes/:id
   it('should delete a note by id', async () => {
      const response = await request(app).delete('/notes/1'); // Assuming note with id 1 exists
      expect(response.status).toBe(204);
   });

   // Test for PUT /notes/:id
   it('should update a note by id', async () => {
      const updatedNote = { title: 'Updated Test Note', content: 'Updated Test Content' };
      const response = await request(app).put('/notes/1').send(updatedNote); // Assuming note with id 1 exists
      expect(response.status).toBe(200);
      expect(response.body.title).toBe(updatedNote.title);
      expect(response.body.content).toBe(updatedNote.content);
   });

   // Additional tests for other endpoints as needed...
});
