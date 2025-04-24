import { Test, TestingModule } from '@nestjs/testing';
import { ExampleController } from './example.controller';
import { MongodbService } from 'src/mongodb/mongodb.service';
import { ExampleService } from './example.service';

describe('ExampleController', () => {
  let controller: ExampleController;

  const mockExample = {
    find: jest.fn(),
    findById: jest.fn(),
    save: jest.fn(),
    countDocuments: jest.fn(),
    exec: jest.fn(),
    sort: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
  };

  const mockMongodbService = {
    model: jest.fn().mockReturnValue(mockExample),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleController],
      providers: [
        ExampleService,
        {
          provide: MongodbService,
          useValue: mockMongodbService,
        },
      ],
    }).compile();

    controller = module.get<ExampleController>(ExampleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
