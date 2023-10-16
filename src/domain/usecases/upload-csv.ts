import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import * as csvParser from 'csv-parser';

@Injectable()
export class UploadCsv {
  // constructor();
  async call(file: Express.Multer.File) {
    const columnNames: string[] = [];

    return new Promise((resolve, reject) => {
      createReadStream(file.destination + file.originalname)
        .pipe(csvParser())
        .on('data', (data) => {
          if (columnNames.length === 0) {
            columnNames.push(...Object.keys(data));
          }
        })
        .on('end', () => {
          const columnSplit = columnNames[0].split(';');
          resolve(columnSplit);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
}
