import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FitxersPageRoutingModule } from './fitxers-routing.module';

import { FitxersPage } from './fitxers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FitxersPageRoutingModule
  ],
  declarations: [FitxersPage]
})
export class FitxersPageModule {}
