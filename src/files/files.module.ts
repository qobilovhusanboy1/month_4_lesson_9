import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesService } from './files.service';

@Module({
  providers: [FilesService],
  exports:[FilesService]
})
export class FilesModule {}