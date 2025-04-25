import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Company } from '../../companies/schemas/company.schema';

export enum ProjectStatus {
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
}

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true, enum: ProjectStatus })
  status: ProjectStatus;

  @Prop({ enum: [1, 2, 3] })
  priority: number;

  @Prop([String])
  tags: string[];

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  company: Company;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
