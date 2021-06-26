import { Test, TestingModule } from '@nestjs/testing';
import { CollaborationRequestService } from './collaboration-request.service';

describe('CollaborationRequestService', () => {
  let service: CollaborationRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollaborationRequestService],
    }).compile();

    service = module.get<CollaborationRequestService>(CollaborationRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
