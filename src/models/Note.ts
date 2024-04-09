import { model, Model, Schema } from 'mongoose';
import toJSON from '../lib/toJSON';
import { NoteDocument } from '../types/main';

interface NoteModel extends Model<NoteDocument> {}
const noteSchema = new Schema<NoteDocument, NoteModel>(
  {
    content: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt timestamps
    versionKey: false, // Disable versioning (__v field)
    minimize: false, // Save empty objects and arrays by default
  },
);
noteSchema.set('validateBeforeSave', false);
noteSchema.plugin(toJSON);

const NoteModel = model<NoteDocument, NoteModel>('Note', noteSchema);

export default NoteModel;
