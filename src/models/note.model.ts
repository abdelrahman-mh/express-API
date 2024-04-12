import { model, Schema } from 'mongoose';
import toJSON from '../lib/toJSON';
import { NoteDocument, NoteSchemaModel } from '../types/notes.types';

const noteSchema = new Schema<NoteDocument, NoteSchemaModel>(
  {
    content: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    // userId: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true, // Add createdAt and updatedAt timestamps
    versionKey: false, // Disable versioning (__v field)
    minimize: false, // Save empty objects and arrays by default
  }
);
noteSchema.set('validateBeforeSave', false);
noteSchema.plugin(toJSON);

const NoteModel = model<NoteDocument, NoteSchemaModel>('Note', noteSchema);

export default NoteModel;
