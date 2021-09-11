import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { access } from 'fs/promises';

@Controller('file')
export class FileController {
  @Get(':fileName')
  getFile(@Param('fileName') fileName: string) {
    const filePath = join(process.cwd(), fileName);
    return access(filePath)
      .then(() => {
        const file = createReadStream(join(process.cwd(), fileName));
        return new StreamableFile(file);
      })
      .catch((err) => {
        if (err) {
          throw err;
        }
      });
  }
}
