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
  items : any = [];

  constructor (private _cryptoService : CryptoService) {}

  ngOnInit() {
    this.cryptos = [];

    this._cryptoService.retrieveCryptos().then((data : any) => {
      data.data.map((el : Crypto) => this.cryptos.push(el));
    });

  }

  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 50; i++) {
      this.items.push(`Item ${count + i}`);
    }
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
    return parseInt(price) > 0 ? 'green' : 'red';
  }
}
