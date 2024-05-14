import { Injectable } from '@angular/core';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  async writeSecretFile(cryptoName: string) {
    try {
      const existingContent = await this.readSecretFile();

      const newContent = existingContent ? `${existingContent}\n${cryptoName}` : cryptoName;

      await Filesystem.writeFile({
        path: 'crypto.txt',
        data: newContent,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
        recursive: true 
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async readSecretFile(): Promise<string | null> {
    try {
      const file = await Filesystem.readFile({
        path: 'crypto.txt',
        directory: Directory.Documents,
        encoding: Encoding.UTF8
      });
  
      if (typeof file.data === 'string') {
        return file.data;
      } else {
        return null;
      }
    } catch (error : any) {
      if (error.message === 'File does not exist') {
        return null;
      } else {
        console.log('El fitxer no existeix');
        throw error;
      }
    }
  }
  

}
