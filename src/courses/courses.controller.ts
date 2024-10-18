import { Controller, Get, Post, Body,Param, Delete, Put, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiOperation({ summary: 'Create an course' })
  @ApiResponse({ status: 201, description: 'The course has been successfully created.', type: CreateCourseDto })
  create(@Body(new ValidationPipe({whitelist:true})) createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({ status: 200, description: 'Return all courses.', type: [CreateCourseDto] })
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }
  
  @ApiOperation({ summary: 'Get course by id' })
  @ApiResponse({ status: 200, description: 'Return course by id.', type: CreateCourseDto })
  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: string) {
    return this.coursesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update course by id' })
  @ApiResponse({ status: 200, description: 'Return updated course.', type: UpdateCourseDto })
  @Put(':id')
  update(@Param('id',ParseIntPipe) id: string, @Body(new ValidationPipe({whitelist:true})) updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }
  @ApiOperation({ summary: 'Delete course by id' })
  @ApiResponse({ status: 200, description: 'Return deleted course.' })
  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: string) {
    return this.coursesService.remove(+id);
  }
}
