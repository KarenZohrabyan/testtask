import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('ProjectsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/companies/:companyId/projects (GET) should return 401 without token', () => {
    return request(app.getHttpServer())
      .get('/companies/123/projects')
      .expect(401);
  });

  it('/companies/:companyId/projects (GET) should handle pagination', () => {
    return request(app.getHttpServer())
      .get('/companies/123/projects?page=1&limit=5')
      .expect(401);
  });

  afterEach(async () => {
    await app.close();
  });
});
