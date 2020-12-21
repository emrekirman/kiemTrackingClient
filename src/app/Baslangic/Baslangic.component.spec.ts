/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BaslangicComponent } from './Baslangic.component';

describe('BaslangicComponent', () => {
  let component: BaslangicComponent;
  let fixture: ComponentFixture<BaslangicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaslangicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaslangicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
