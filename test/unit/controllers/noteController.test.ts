import { Response } from 'express';
import { AuthenticatedRequest } from '../../../src/middlewares/authMiddleware';
import noteController from '../../../src/controllers/noteController';
import notesServices from '../../../src/service/noteServices';
import toNewNote from '../../../src/typeGuards/toNewNote';
import toNewNoteUpdate from '../../../src/typeGuards/toNewNoteUpdate';
import { Note } from '../../../src/types/Note';
import helper, { assertErrorResponse, assertSuccessResponse, mockAuthRequest, mockResponse, mockNext } from '../helper';

jest.mock('../../../src/service/noteServices');
jest.mock('../../../src/typeGuards/toNewNoteUpdate');
jest.mock('../../../src/typeGuards/toNewNote');

const mockToNewNote = toNewNote as jest.Mock;
const mockToNewNoteUpdate = toNewNoteUpdate as jest.Mock;

const mockAddNote = notesServices.addNote as jest.Mock;
const mockComplete = notesServices.complete as jest.Mock;
const mockUnComplete = notesServices.unComplete as jest.Mock;
// const mockFindUser = notesServices.findUser as jest.Mock;
const mockGetNoteById = notesServices.getNoteById as jest.Mock;
const mockGetUserNotes = notesServices.getUserNotes as jest.Mock;
const mockUpdateNote = notesServices.updateNote as jest.Mock;
const mockRemoveNote = notesServices.removeNote as jest.Mock;

describe('Notes Controller', () => {
   beforeEach(() => {
      mockToNewNote.mockReset();
      mockToNewNoteUpdate.mockReset();
   });

   describe('GetNotes', () => {
      it('should get all notes successfully', async () => {
         // Arrange
         const mockNotes = [helper.generateNote()];
         mockGetUserNotes.mockResolvedValue(mockNotes);

         // Act
         await noteController.getNotes(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

         // Assert

         assertSuccessResponse(mockResponse, mockNext, 200, mockNotes);
      });

      it('should handle errors during getNotes', async () => {
         const mockError = new Error('Mock error22');
         mockGetUserNotes.mockRejectedValue(mockError);

         await noteController.getNotes(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

         assertErrorResponse(mockResponse, mockNext, mockError);
      });
   });

   describe('GetNoteById', () => {
      it('should get a note by ID successfully', async () => {
         const mockNote = helper.generateNote();
         mockGetNoteById.mockResolvedValue(mockNote);

         await noteController.getNoteById(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

         expect(mockResponse.json).toHaveBeenCalledWith(mockNote);
         expect(mockResponse.status).toHaveBeenCalledWith(200);
         expect(mockNext).not.toHaveBeenCalled();
      });

      it('should handle errors during getNoteById', async () => {
         const mockError = new Error('Mock error');
         mockGetNoteById.mockRejectedValue(mockError);

         await noteController.getNoteById(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

         assertErrorResponse(mockResponse, mockNext, mockError);
      });

      it('should handle note not found during getNoteById', async () => {
         mockGetNoteById.mockResolvedValue(null);

         await noteController.getNoteById(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

         assertSuccessResponse(mockResponse, mockNext, 404, { error: 'notFound' });
      });
   });

   describe('AddNote', () => {
      it('should add a new note successfully', async () => {
         const mockNoteContent = { title: 'New Note', complete: false };
         const mockNewNote: Note = helper.generateNote(mockNoteContent);

         mockAddNote.mockResolvedValue(mockNewNote);
         mockAuthRequest.body = mockNoteContent;

         await noteController.addNote(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

         assertSuccessResponse(mockResponse, mockNext, 201, mockNewNote);
      });
      it('should handle errors if typeGuards return error', async () => {
         const mockError = new Error('Mock error2222');
         mockToNewNote.mockImplementation(() => {
            throw mockError;
         });

         await noteController.addNote(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

         assertErrorResponse(mockResponse, mockNext, mockError);
      });
      it('should handle errors during addNote', async () => {
         const mockError2 = new Error('Mock Error');
         mockAddNote.mockImplementation(() => {
            throw mockError2;
         });
         mockAuthRequest.body = { title: 'New Note', complete: false };

         await noteController.addNote(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

         assertErrorResponse(mockResponse, mockNext, mockError2);
      });
   });

   describe('RemoveNote', () => {
      it('should remove a note successfully', async () => {
         const mockDeletedNote: Note = helper.generateNote();

         mockRemoveNote.mockResolvedValue(mockDeletedNote);

         await noteController.removeNote(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

         expect(mockResponse.status).toHaveBeenCalledWith(204);
         expect(mockResponse.send).toHaveBeenCalled();
         expect(mockNext).not.toHaveBeenCalled();
      });

      it('should handle errors during removeNote', async () => {
         const mockError = new Error('Mock error');
         mockRemoveNote.mockRejectedValue(mockError);

         await noteController.removeNote(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

         assertErrorResponse(mockResponse, mockNext, mockError);
      });

      it('should handle note not found during removeNote', async () => {
         mockRemoveNote.mockResolvedValue(null);

         await noteController.removeNote(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

         assertSuccessResponse(mockResponse, mockNext, 404, { error: 'notFound' });
      });
   });

   describe('updateNote', () => {
      it('should update a note successfully', async () => {
         const mockUpdate = { title: 'Updated Note', complete: true };
         const mockUpdatedNote: Note = helper.generateNote(mockUpdate);

         mockUpdateNote.mockResolvedValue(mockUpdatedNote);
         mockAuthRequest.body = mockUpdate;

         await noteController.updateNote(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

         expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedNote);
         expect(mockNext).not.toHaveBeenCalled();
      });

      it('should handle errors during updateNote', async () => {
         // Arrange
         const mockError = new Error('Mock error');
         mockUpdateNote.mockRejectedValue(mockError);
         mockAuthRequest.body = { title: 'Updated Note', complete: true };

         // Act
         await noteController.updateNote(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

         // Assert
         expect(mockNext).toHaveBeenCalledWith(mockError);
         expect(mockResponse.json).not.toHaveBeenCalled();
      });
      it('should handle errors if typeGuards return error', async () => {
         mockToNewNoteUpdate.mockImplementation(() => {
            throw new Error('Invalid user data');
         });

         await noteController.updateNote(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

         expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
         expect(mockResponse.status).not.toHaveBeenCalled();
         expect(mockResponse.json).not.toHaveBeenCalled();
      });
      it('should handle note not found during updateNote', async () => {
         const update = { title: 'Updated Note', complete: true };

         mockToNewNoteUpdate.mockResolvedValue(update);
         mockUpdateNote.mockResolvedValue(null);
         mockAuthRequest.body = update;

         await noteController.updateNote(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

         assertSuccessResponse(mockResponse, mockNext, 404, { error: 'notFound' });
      });
   });

   describe('Complete', () => {
      it('should complete status of a note successfully', async () => {
         const mockUpdatedNote = helper.generateNote();

         mockComplete.mockResolvedValue(mockUpdatedNote);
         await noteController.complete(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

         expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedNote);
         expect(mockNext).not.toHaveBeenCalled();
      });

      it('should handle errors during complete', async () => {
         const mockError = new Error('Mock error');
         mockComplete.mockRejectedValue(mockError);

         await noteController.complete(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

         expect(mockNext).toHaveBeenCalledWith(mockError);
         expect(mockResponse.json).not.toHaveBeenCalled();
      });

      it('should handle note not found during complete', async () => {
         mockComplete.mockResolvedValue(null);

         await noteController.complete(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

         assertSuccessResponse(mockResponse, mockNext, 404, { error: 'notFound' });
      });
   });
   describe('UnComplete', () => {
      it('should unComplete status of a note successfully', async () => {
         const mockUpdatedNote = helper.generateNote();

         mockUnComplete.mockResolvedValue(mockUpdatedNote);

         await noteController.unComplete(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

         expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedNote);
         expect(mockNext).not.toHaveBeenCalled();
      });

      it('should handle errors during unComplete', async () => {
         const mockError = new Error('Mock error');
         mockUnComplete.mockRejectedValue(mockError);

         await noteController.unComplete(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

         expect(mockNext).toHaveBeenCalledWith(mockError);
         expect(mockResponse.json).not.toHaveBeenCalled();
      });

      it('should handle note not found during unComplete', async () => {
         mockUnComplete.mockResolvedValue(null);

         await noteController.unComplete(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

         assertSuccessResponse(mockResponse, mockNext, 404, { error: 'notFound' });
      });
   });
});
