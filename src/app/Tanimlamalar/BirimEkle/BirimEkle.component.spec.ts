/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BirimEkleComponent } from './BirimEkle.component';

describe('BirimEkleComponent', () => {
  let component: BirimEkleComponent;
  let fixture: ComponentFixture<BirimEkleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirimEkleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirimEkleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
