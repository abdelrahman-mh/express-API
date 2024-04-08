import { model, Schema } from 'mongoose';
import { NewNoteDocument } from '../types/Note';

const noteSchema = new Schema<NewNoteDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    complete: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      require: true,
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt timestamps
    versionKey: false, // Disable versioning (__v field)
    minimize: false, // Save empty objects and arrays by default
  }
);
noteSchema.set('validateBeforeSave', false);

noteSchema.virtual('id').get(function () {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  return this._id.toHexString();
});

// remove unwanted _id and password
noteSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    delete ret._id;
    delete ret.password;
  },
});

const NoteModel = model<NewNoteDocument>('Note', noteSchema);

export default NoteModel;
