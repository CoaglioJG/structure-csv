import { Module } from '@nestjs/common';
import { UploadCsv } from './usecases/upload-csv';
import { GetDataColumn } from './usecases/get-data-column';

@Module({
  providers: [UploadCsv, GetDataColumn],
  exports: [UploadCsv, GetDataColumn],
})
export class DomainModule {}
