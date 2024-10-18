import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class CoursesService {
  constructor(private readonly dbRepository: DatabaseService) {}
  async create(createCourseDto: CreateCourseDto) {
    const newTodo=await this.dbRepository.course.create({
      data: createCourseDto,
    });
    if(newTodo){
      return newTodo;
    }
    throw new InternalServerErrorException("Error while creating course");
  }
  async findAll() {
    return await this.dbRepository.course.findMany();
  }

 async findOne(id: number) {
    const course = await this.dbRepository.course.findUnique({ where: { id } });
    if(!course){
      throw new NotFoundException(`Course not found`);
    }
    return course;
  }

 async update(id: number, updateCourseDto: UpdateCourseDto) {
  
  const updatedCourse=await this.dbRepository.course.update({
    where: { id },
    data: updateCourseDto,
  });       
  if(updatedCourse){
    return updatedCourse;     
  }
  throw new BadRequestException("Error while updating course");
    
  }
  async remove(id: number) {
    const course = await this.dbRepository.course.findUnique({ where: { id } });
    if(!course){
      throw new NotFoundException(`Course not found`);
    }
    const deletedCourse=await this.dbRepository.course.delete({
      where: { id },
    });
      return deletedCourse;
  }
  
}
