
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import * as uuid from 'uuid';

@Injectable()
export class FilesService{
  async createFile(file:any):Promise<string>{
    try {
      const filename = uuid.v4()+'.jpg';
      const filePath = path.resolve(__dirname,'..','static');
      if(!fs.existsSync(filePath)){
        fs.mkdirSync(filePath,{recursive:true});
      }
      fs.writeFileSync(path.join(filePath, filename),file.buffer)
      return filename
    } catch (error) {
        console.log(error);
        
      throw new HttpException(
        'Faylni yozishda xatolik',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
