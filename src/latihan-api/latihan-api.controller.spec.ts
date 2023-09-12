import { Test, TestingModule } from '@nestjs/testing';
import { LatihanApiController } from './latihan-api.controller';

describe('LatihanApiController', () => {
  let controller: LatihanApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LatihanApiController],
    }).compile();

    controller = module.get<LatihanApiController>(LatihanApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
