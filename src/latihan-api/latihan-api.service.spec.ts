import { Test, TestingModule } from '@nestjs/testing';
import { LatihanApiService } from './latihan-api.service';

describe('LatihanApiService', () => {
  let service: LatihanApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LatihanApiService],
    }).compile();

    service = module.get<LatihanApiService>(LatihanApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
