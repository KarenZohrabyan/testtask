import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, Permission } from './schemas/company.schema';
import { AddPermissionDto } from './dto/add-permission.dto';
import { RemovePermissionDto } from './dto/remove-permission.dto';
import { AddCompanyDto } from './dto/add-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}

  async findOne(id: string): Promise<Company> {
    const company = await this.companyModel.findById(id).lean().exec();
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return company;
  }

  async addPermission(
    companyId: string,
    addPermissionDto: AddPermissionDto,
  ): Promise<Company> {
    const company = await this.companyModel.findById(companyId).exec();
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    const permissionIndex = company.permissions.findIndex(
      (p) => p.user.toString() === addPermissionDto.userId.toString(),
    );
    if (permissionIndex >= 0) {
      company.permissions[permissionIndex].permissions = [
        ...new Set([
          ...company.permissions[permissionIndex].permissions,
          ...addPermissionDto.permissions,
        ]),
      ];
    } else {
      company.permissions.push({
        user: addPermissionDto.userId,
        permissions: addPermissionDto.permissions,
      });
    }
    const updated = await company.save();

    return updated;
  }

  async removePermission(
    companyId: string,
    removePermissionDto: RemovePermissionDto,
  ): Promise<Company> {
    const company = await this.companyModel.findById(companyId).exec();
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    const permissionIndex = company.permissions.findIndex(
      (p) => p.user.toString() === removePermissionDto.userId,
    );
    if (permissionIndex >= 0) {
      company.permissions[permissionIndex].permissions = company.permissions[
        permissionIndex
      ].permissions.filter((p) => !removePermissionDto.permissions.includes(p));
      if (company.permissions[permissionIndex].permissions.length === 0) {
        company.permissions.splice(permissionIndex, 1);
      }
      const updated = await company.save();

      return updated;
    }

    throw new NotFoundException('User permissions not found');
  }

  async addCompany(addCompanyDto: AddCompanyDto): Promise<Company> {
    const company = await this.companyModel.insertOne(addCompanyDto)

    return company;
  }

  // async hasPermission(userId: string, companyId: string, permission: Permission): Promise<boolean> {
  //   const company = await this.companyModel.findOne({ _id: companyId });

  //   if (!company) {
  //     throw new Error('Company not found');
  //   }

  //   const userPermissions = company.permissions.find(p => p.user.toString() === userId);

  //   if (!userPermissions) {
  //     return false;
  //   }

  //   return userPermissions.permissions.includes(permission);
  // }
}
