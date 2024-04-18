import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestEntity } from './entitys/test.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([TestEntity])
  ],
  providers: [TestService],
  exports: [TestService]
})
export class TestModule {}
