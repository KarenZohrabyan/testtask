import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/company.module';
import { ProjectsModule } from './projects/project.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        uri: process.env.MONGO_URI,
        retryAttempts: 3,
        retryDelay: 1000,
      }),
    }),
    AuthModule,
    UsersModule,
    CompaniesModule,
    ProjectsModule,
  ],
})
export class AppModule {}
