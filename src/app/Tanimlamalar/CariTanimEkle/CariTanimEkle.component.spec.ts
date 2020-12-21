/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CariTanimEkleComponent } from './CariTanimEkle.component';

describe('CariTanimEkleComponent', () => {
  let component: CariTanimEkleComponent;
  let fixture: ComponentFixture<CariTanimEkleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CariTanimEkleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CariTanimEkleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
