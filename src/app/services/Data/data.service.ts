import { Injectable } from '@angular/core';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  async writeSecretFile(cryptoName : string) {
    await Filesystem.writeFile({
      path: 'crypto/crypto.txt',
      data: `${cryptoName}`,
      directory: Directory.Documents,
      encoding: Encoding.UTF8
    });
  }

  async readSecretFile () {
    const contents = await Filesystem.readFile({
      path: 'crypto/crypto.txt',
      directory: Directory.Documents,
      encoding: Encoding.UTF8
    });

    console.log(`Secrets : ${contents}`);
  }

}
