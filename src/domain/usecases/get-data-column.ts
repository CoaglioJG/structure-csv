import { Injectable } from '@nestjs/common';
import path from 'path';
import * as fs from 'fs';
import { createReadStream } from 'fs';
import * as csvParser from 'csv-parser';

@Injectable()
export class GetDataColumn {
  async call(payload: Array<string>) {
    const folder = 'files/csv';
    const file = await new Promise((resolve, reject) => {
      fs.readdir(folder, (err, files) => {
        if (err) {
          reject(err);
        }

        if (files.length > 0) {
          resolve(files[0]);
        } else {
          resolve('');
        }
      });
    });

    if (!file) return;

    if (!Array.isArray(payload)) {
      payload = [payload];
    }

    return new Promise((resolve, reject) => {
      const result = {};
      createReadStream(folder + '/' + file)
        .pipe(csvParser())
        .on('data', (data) => {
          const dataKeys = Object.keys(data);
          //   const dataValues = data[dataKeys];
          //   console.log(dataKeys, dataValues);

          const teste = dataKeys.map((key) => {
            return key.split(';');
            //     // Separar a chave em partes antes e depois dos dois pontos
            //     const [beforeColon, afterColon] = key.split(';');
            //     const [keyWithoutColon, value] = afterColon.split(':'); // Dividir após o ":" para obter o valor
            //     console.log(keyWithoutColon, value);
            //     if (payload.includes(beforeColon)) {
            //       result[beforeColon] = value;
            //     }
          });
          console.log(teste[0]);
        })
        .on('end', () => {
          //   console.log(result);
          resolve(result);
          //   const columnSplit = columnNames[0].split(';');
          //   resolve(columnSplit);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
}
