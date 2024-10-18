import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { DatabaseService } from '../database/database.service';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCourseDto, Level } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { MockContext, createMockContext } from '../prisma-mock-setup';
import { mockReset } from 'jest-mock-extended';

describe('CoursesService', () => {
  let service: CoursesService;
  let mockContext: MockContext;
  const mockArrayCourses = [
    { id: 1, title: 'Course 1', description: 'Course 1 description', level: Level.DEBUTANT },
    { id: 2, title: 'Course 2', description: 'Course 2 description', level: Level.INTERMEDIAIRE },
    { id: 3, title: 'Course 3', description: 'Course 3 description', level: Level.AVANCE },
  ];
  afterEach(() => {
    mockReset(mockContext.prisma);
  });


  beforeEach(async () => {
    mockContext = createMockContext();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        {
          provide: DatabaseService,
          useValue: mockContext.prisma,
        },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
  });

  
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a course successfully', async () => {
      const createCourseDto: CreateCourseDto = mockArrayCourses[0];
      const expectedResult = { id: 1, ...createCourseDto };
      mockContext.prisma.course.create.mockResolvedValue(expectedResult);

      const result = await service.create(createCourseDto);
      expect(result).toEqual(expectedResult);
      expect(mockContext.prisma.course.create).toHaveBeenCalledWith({ data: createCourseDto });
    });

    it('should throw InternalServerErrorException if creation fails', async () => {
      const createCourseDto: CreateCourseDto = mockArrayCourses[0];
      mockContext.prisma.course.create.mockResolvedValue(null);

      await expect(service.create(createCourseDto)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findAll', () => {
    it('should return an array of courses', async () => {
      mockContext.prisma.course.findMany.mockResolvedValue(mockArrayCourses);

      const result = await service.findAll();
      expect(result).toEqual(mockArrayCourses);
    });
  });

  describe('findOne', () => {
    it('should return a course if found', async () => {
      const expectedResult = { id: 1,title: 'Course 1',description: 'Course 1 description',level:Level.DEBUTANT };
      mockContext.prisma.course.findUnique.mockResolvedValue(expectedResult);

      const result = await service.findOne(1);
      expect(result.id).toEqual(expectedResult.id);
    });

    it('should throw NotFoundException if course not found', async () => {
      mockContext.prisma.course.findUnique.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a course successfully', async () => {
      const updateCourseDto: UpdateCourseDto = { title: mockArrayCourses[0].title };
      const expectedResult = { id: 1, ...mockArrayCourses[0] };
      mockContext.prisma.course.update.mockResolvedValue(expectedResult);

      const result = await service.update(1, updateCourseDto);
      expect(result).toEqual(expectedResult);
      expect(mockContext.prisma.course.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateCourseDto,
      });
    });

    it('should throw BadRequestException if update fails', async () => {
      const updateCourseDto: UpdateCourseDto = { title: 'Updated Course' };
      mockContext.prisma.course.update.mockResolvedValue(null);
      await expect(service.update(1, updateCourseDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should delete a course successfully', async () => {
      const expectedResult = mockArrayCourses[0];
      mockContext.prisma.course.delete.mockResolvedValue(expectedResult);
      mockContext.prisma.course.findUnique.mockResolvedValue(expectedResult);
      const result = await service.remove(1);
      expect(result).toEqual(expectedResult);
      expect(mockContext.prisma.course.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if deletion fails', async () => {
      mockContext.prisma.course.delete.mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});