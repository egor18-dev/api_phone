import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FitxersPage } from './fitxers.page';

describe('FitxersPage', () => {
  let component: FitxersPage;
  let fixture: ComponentFixture<FitxersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FitxersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
