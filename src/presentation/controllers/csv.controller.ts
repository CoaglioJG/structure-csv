import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadCsv } from '../../domain/usecases/upload-csv';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { GetDataColumn } from '../../domain/usecases/get-data-column';

@Controller('csv')
export class CsvController {
  constructor(
    private readonly uploadCsvUseCase: UploadCsv,
    private readonly getDataColumnUseCase: GetDataColumn,
  ) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files/csv/',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  uploadCsv(@UploadedFile() file: Express.Multer.File) {
    return this.uploadCsvUseCase.call(file);
  }

  @Post('columns')
  dataColumn(@Body() payload: Array<string>) {
    return this.getDataColumnUseCase.call(payload);
  }
}
