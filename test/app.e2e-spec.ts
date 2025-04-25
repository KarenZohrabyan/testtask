import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return 401 for protected routes without token', () => {
    return request(app.getHttpServer())
      .get('/companies/123/projects')
      .expect(401);
  });

  it('should return 400 for invalid login data', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'invalid', password: '' })
      .expect(400);
  });

  afterEach(async () => {
    await app.close();
  });
});
