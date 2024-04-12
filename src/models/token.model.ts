import mongoose from 'mongoose';
import toJSON from '../lib/toJSON';
import { TokenDocument, TokenSchemaModel, TokensTypes } from 'types/token.types';

const tokenSchema = new mongoose.Schema<TokenDocument, TokenSchemaModel>(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: String,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(TokensTypes),
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
tokenSchema.plugin(toJSON);

const Token = mongoose.model<TokenDocument, TokenSchemaModel>('Token', tokenSchema);

export default Token;
