import { Test, TestingModule } from '@nestjs/testing';
import { SisconfigController } from './sisconfig.controller';

describe('SisconfigController', () => {
  let controller: SisconfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SisconfigController],
    }).compile();

    controller = module.get<SisconfigController>(SisconfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
