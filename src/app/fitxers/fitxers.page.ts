import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/Data/data.service';

@Component({
  selector: 'app-fitxers',
  templateUrl: './fitxers.page.html',
  styleUrls: ['./fitxers.page.scss'],
})
export class FitxersPage implements OnInit {

  public data !: any [];

  constructor(private _dataService : DataService) { }

  ngOnInit() {
    this._dataService.readSecretFile().then((data : any) => {
      if(data) this.data = data;
    });
  }

}
