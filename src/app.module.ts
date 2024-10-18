import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [DatabaseModule,ConfigModule.forRoot({isGlobal: true}), CoursesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
