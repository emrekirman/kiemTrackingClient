/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OlcuBirimDuzenleComponent } from './OlcuBirimDuzenle.component';

describe('OlcuBirimDuzenleComponent', () => {
  let component: OlcuBirimDuzenleComponent;
  let fixture: ComponentFixture<OlcuBirimDuzenleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlcuBirimDuzenleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlcuBirimDuzenleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
