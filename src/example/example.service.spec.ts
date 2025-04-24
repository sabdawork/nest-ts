import mongoose from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { ExampleService } from './example.service';
import { ExampleDocument } from 'src/schema/example.schema';
import { MongodbService } from 'src/mongodb/mongodb.service';

describe('Example Service', () => {
  let exampleService: ExampleService;

  const mockExample = {
    find: jest.fn().mockReturnThis(),
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
      providers: [
        ExampleService,
        {
          provide: MongodbService,
          useValue: mockMongodbService,
        },
      ],
    }).compile();

    exampleService = module.get<ExampleService>(ExampleService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(exampleService).toBeDefined();
  });

  it('getExample should return a list of examples', async () => {
    const examples: ExampleDocument[] = [
      {
        _id: new mongoose.Types.ObjectId(),
        name: 'Name 1',
        email: 'email1@example.com',
      } as ExampleDocument,
      {
        _id: new mongoose.Types.ObjectId(),
        name: 'Name 2',
        email: 'email2@example.com',
      } as ExampleDocument,
    ];

    // Mock the chain of methods
    mockExample.find.mockReturnValue({
      sort: jest.fn().mockReturnValue({
        limit: jest.fn().mockResolvedValue(examples),
      }),
    });

    const result = await exampleService.getExample();

    expect(result).toEqual(examples);
    expect(mockExample.find).toHaveBeenCalledTimes(1);
    expect(mockExample.find().sort).toHaveBeenCalledWith({ createdAt: -1 });
    expect(mockExample.find().sort().limit).toHaveBeenCalledWith(2);
  });
});
