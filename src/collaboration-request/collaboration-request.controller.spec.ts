import { Test, TestingModule } from '@nestjs/testing';
import { CollaborationRequestController } from './collaboration-request.controller';

describe('CollaborationRequestController', () => {
  let controller: CollaborationRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollaborationRequestController],
    }).compile();

    controller = module.get<CollaborationRequestController>(CollaborationRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
