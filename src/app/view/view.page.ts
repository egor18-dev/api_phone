import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CryptoService } from '../services/Crypto/crypto.service';
import { Crypto } from '../models/crypto';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  private _id !: string;
  public crypto !: Crypto;

  constructor(private _activatedRoute : ActivatedRoute,
    private _router : Router,
    private _cryptoService : CryptoService
  ) { }

  ngOnInit() {
    // this._id = this._activatedRoute.snapshot.paramMap.get('id')!;

    // this._cryptoService.retrieveCrypto(this._id).subscribe({
    //   next: (data : any) => {
    //     this.crypto = data.data;
    //   },
    //   error: () => {
    //     this._router.navigate(['/home']);
    //   }
    // });
  }

  getCryptoColor (cryptoValue : any) {
    return parseInt(cryptoValue) > 0 ? '#25b331' : '#e41010';
  }

}
