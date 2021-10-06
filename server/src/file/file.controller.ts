import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { pathExists } from 'fs-extra';
import { Logger } from '@nestjs/common';

@Controller('file')
export class FileController {
  private logger = new Logger('FileController');

  constructor(private configService: ConfigService) {}

  @Get(':fileName')
  getFile(@Param('fileName') fileName: string) {
    const dataAbsDir = this.configService.get('TROVE_ABS_DIR');
    const filePath = join(dataAbsDir, fileName);

    return pathExists(filePath)
      .then((exists) => {
        if (exists) {
          this.logger.log(`Send file '${filePath}'`);
          const file = createReadStream(filePath);
          return new StreamableFile(file);
        } else {
          throw new Error(`File '${filePath}' doesn't exist`);
        }
      })
      .catch((err) => {
        if (err) {
          throw err;
        }
      });
  }
}
