import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CryptoService } from '../services/Crypto/crypto.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Crypto } from '../models/crypto';
import jsQR from 'jsqr';
import { Router } from '@angular/router';
import { DataService } from '../services/Data/data.service';
import { CameraService } from '../services/Camera/camera.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  isOpened: boolean = false;
  cryptos: Crypto[] = [];
  cryptosCopy: Crypto[] = [];
  private _selectedValue !: string;

  @ViewChild('video', { static: false }) videoElement!: ElementRef;
  video: any;

  public crypto: string = '';

  /*
    - COMENTARI EXAMEN-
    
    Al meu dispositiu mobil no es valid el lector de BARRES QR,
    per això o faig fer d'aquella manera amb el canvas, i ara no puc
    provar si funciona del tot. Pero hauria d'anar aixi.
  */

  constructor(private _cryptoService: CryptoService,
    private _router : Router,
    private _dataService : DataService,
    private _cameraService : CameraService
  ) { }

  ngOnInit() {
    this.generateItems(true);
  }

  private generateItems(remove: boolean = false) {
    if (remove) {
      this.cryptos = [];
      this.cryptosCopy = this.cryptos;
    }

    this._cryptoService.retrieveCryptos();
  }

  onIonInfinite(ev: any) {
    this.generateItems();

    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  getCryptos() {
    if(this._selectedValue){

      if(this._selectedValue === 'major'){
        return this._cryptoService.getCryptos().filter((crypto: Crypto) => Number(crypto.changePercent24Hr) > 0);
      }else if(this._selectedValue === 'menor'){
        return this._cryptoService.getCryptos().filter((crypto: Crypto) => Number(crypto.changePercent24Hr) < 0);
      }else{
        return this._cryptoService.getCryptos();
      }

    }else{
      return this._cryptoService.getCryptos();
    }
  }

  getColor(price: string) {
    return Number(price) < 0 ? 'red' : '#29b813';
  }

  search() {
    if (this.crypto === '') {
      this.cryptos = this.cryptosCopy;
    }

    this.cryptos = this.cryptos.filter((crypto: Crypto) => crypto.name.toLowerCase().startsWith(this.crypto.toLowerCase()));
  }

  scan() {
    this._cameraService.scan().then((crypto : any) => {
        /* 
          -- No se si crypto ja es directament el nom de la criptomoneda perque no tinc com 
          provar-ho
        */
        this._dataService.writeSecretFile(crypto);
    });   
  }

  read(event: any) {
    this._selectedValue = event.detail.value;
  }
}
