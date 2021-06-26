import { Test, TestingModule } from '@nestjs/testing';
import { TablerosController } from './tableros.controller';

describe('TablerosController', () => {
  let controller: TablerosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TablerosController],
    }).compile();

    controller = module.get<TablerosController>(TablerosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
