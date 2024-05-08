import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CryptoService } from '../services/Crypto/crypto.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Crypto } from '../models/crypto';
import jsQR from 'jsqr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  isOpened: boolean = false;
  cryptos: Crypto[] = [];
  cryptosCopy: Crypto[] = [];

  @ViewChild('video', { static: false }) videoElement!: ElementRef;
  video: any;

  public crypto: string = '';

  constructor(private _cryptoService: CryptoService,
    private _router : Router
  ) { }

  ngOnInit() {
    this.generateItems(true);
  }

  private generateItems(remove: boolean = false) {
    if (remove) {
      this.cryptos = [];
      this.cryptosCopy = this.cryptos;
    }

    this._cryptoService.retrieveCryptos().then((data: any) => {
      data.data.map((el: Crypto) => this.cryptos.push(el));
      console.log(data);
    });
  }

  onIonInfinite(ev: any) {
    this.generateItems();

    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  getCryptos() {
    return this.cryptos;
  }

  getColor(price: string) {
    return Number(price) < 0 ? 'red' : '#29b813';
  }

  search() {
    if (this.crypto === '') {
      this.cryptos = this.cryptosCopy;
    }

    console.log(this.crypto);
    console.log(this.cryptos);

    this.cryptos = this.cryptos.filter((crypto: Crypto) => crypto.name.toLowerCase().startsWith(this.crypto.toLowerCase()));
  }

  scan() {
    this.isOpened = true;
    this.video = this.videoElement.nativeElement;

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        this.video.srcObject = stream;
        this.video.play();
        this.scanForQrCode();
      })
      .catch(error => {
        console.error('Error accessing camera:', error);
      });
  }

  scanForQrCode() {
    const canvasElement = document.createElement('canvas');
    const canvas = canvasElement.getContext('2d')!;
    const video = this.video;
  
    const self = this;
  
    function captureFrame() {
      canvasElement.width = video.videoWidth;
      canvasElement.height = video.videoHeight;
  
      if (video.videoWidth && video.videoHeight) {
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
  
        const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
  
        const code = jsQR(imageData.data, imageData.width, imageData.height);
  
        if (code) {
          self._router.navigate([`/view/${code.data}`]);
          self.isOpened = false;
        } else {
          requestAnimationFrame(captureFrame);
        }
      } else {
        requestAnimationFrame(captureFrame);
      }
    }
    captureFrame();
  }
  

  

  read(event: any) {
    const selectedValue = event.detail.value;
    this.cryptos = this.cryptosCopy;

    if (selectedValue === 'major') {
      this.cryptos = this.cryptos.filter((crypto: Crypto) => Number(crypto.changePercent24Hr) > 0);
    } else if (selectedValue === 'menor') {
      this.cryptos = this.cryptos.filter((crypto: Crypto) => Number(crypto.changePercent24Hr) < 0);
    }
  }
}
