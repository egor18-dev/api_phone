import { Injectable } from '@angular/core';
import { Barcode, BarcodeFormat, BarcodeScanner, IsSupportedResult, ScanOptions, ScanResult } from '@capacitor-mlkit/barcode-scanning';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  private _barcodes !: Barcode[];
  private _supported: boolean;

  constructor() {
    this._supported = false;
    this.isSupported();
  }

  isSupported(): void {
    BarcodeScanner.isSupported().then(
      (result: IsSupportedResult) => {
        this._supported = result.supported;
      }
    ).catch(
      (error: any) => {
        this._supported = false;
      }
    ).finally(() => {});
  }

  get supported(): boolean {
    return this._supported
  }

  async requestPermissions(): Promise<boolean> {
    const permissions: any = await BarcodeScanner.requestPermissions();
    return permissions.camera === 'granted' || permissions.camera === 'limited';
  }

  async scan(): Promise<boolean> {
    const granted = await this.requestPermissions();
    if(granted) { 
      const options: ScanOptions = {
        formats: [BarcodeFormat.Ean13, BarcodeFormat.QrCode]
      }

      const result: ScanResult = await BarcodeScanner.scan(options);
      this._barcodes = result.barcodes;

      return true;
    }
    this._barcodes = [];
    return false;
  }

  get barcodes(): Barcode[] {
    return this._barcodes;
  }

}
