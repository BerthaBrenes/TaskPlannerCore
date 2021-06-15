import { Test, TestingModule } from '@nestjs/testing';
import { SisconfigService } from './sisconfig.service';

describe('SisconfigService', () => {
  let service: SisconfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SisconfigService],
    }).compile();

    service = module.get<SisconfigService>(SisconfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
