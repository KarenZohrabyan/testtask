import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsService } from './project.service';
import { ProjectsController } from './project.controller';
import { Project, ProjectSchema } from './schemas/project.schema';
import { CompaniesModule } from 'src/companies/company.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    CompaniesModule
  ],
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
