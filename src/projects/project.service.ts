import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './schemas/project.schema';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CompaniesService } from 'src/companies/company.service';
import { Permission } from 'src/companies/schemas/company.schema';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    private companyService: CompaniesService,
  ) {}

  async findAllByCompany(
    companyId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ projects: Project[]; total: number }> {
    const skip = (page - 1) * limit;

    const [projects, total] = await Promise.all([
      this.projectModel
        .find({ company: companyId })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      this.projectModel.countDocuments({ company: companyId }).exec(),
    ]);

    return { projects, total };
  }

  async update(
    companyId: string,
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.projectModel
      .findOne({ _id: id, company: companyId })
      .exec();
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    const updated = await this.projectModel
      .findByIdAndUpdate(id, updateProjectDto, { new: true })
      .lean()
      .exec();
    return updated;
  }

  async create(
    companyId: string,
    createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    const project = await this.projectModel.insertOne({
      ...createProjectDto,
      ...{ company: companyId },
    });
    return project;
  }
}
