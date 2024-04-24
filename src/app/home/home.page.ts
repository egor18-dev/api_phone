import { Component } from '@angular/core';
import { CryptoService } from '../services/Crypto/crypto.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Crypto } from '../models/crypto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  cryptos : Crypto [] = [];
  cryptosCopy : Crypto [] = [];
  items : any = [];

  public crypto : string = '';

  constructor (private _cryptoService : CryptoService) {}

  ngOnInit() {
    this.generateItems(true);
  }

  private generateItems(remove : boolean = false) {
    if(remove){
      this.cryptos = [];
      this.cryptosCopy = this.cryptos;      
    }

    this._cryptoService.retrieveCryptos().then((data : any) => {
      data.data.map((el : Crypto) => this.cryptos.push(el));
      console.log(data);
    });
  }

  onIonInfinite(ev : any) {
    this.generateItems();

    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  getCryptos () {
    return this.cryptos;
  }

  getColor (price : string) {
    return Number(price) < 0 ? 'red' : '#29b813';
  }

  search () {
    if(this.crypto === ''){
      this.cryptos = this.cryptosCopy;
    }

    console.log(this.crypto);
    console.log(this.cryptos);

    this.cryptos = this.cryptos.filter((crypto : Crypto) => crypto.name.toLowerCase().startsWith(this.crypto.toLowerCase()));
  }
}
