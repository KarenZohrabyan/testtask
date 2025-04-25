import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export enum Permission {
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE',
  ADMIN = 'ADMIN',
}

@Schema({ timestamps: true })
export class Company extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  industry: string;

  @Prop({
    type: [
      {
        user: { type: Types.ObjectId, ref: 'User' },
        permissions: { type: [String], enum: Permission },
      },
    ],
  })
  permissions: { user: Types.ObjectId; permissions: Permission[] }[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
