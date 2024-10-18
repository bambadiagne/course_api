import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService],
  imports: [DatabaseModule],
})
export class CoursesModule {}
