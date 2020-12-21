/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StokTanimEkleComponent } from './StokTanimEkle.component';

describe('StokTanimEkleComponent', () => {
  let component: StokTanimEkleComponent;
  let fixture: ComponentFixture<StokTanimEkleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StokTanimEkleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StokTanimEkleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
