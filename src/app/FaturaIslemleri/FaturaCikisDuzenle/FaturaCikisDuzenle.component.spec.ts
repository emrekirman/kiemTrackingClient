/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FaturaCikisDuzenleComponent } from './FaturaCikisDuzenle.component';

describe('FaturaCikisDuzenleComponent', () => {
  let component: FaturaCikisDuzenleComponent;
  let fixture: ComponentFixture<FaturaCikisDuzenleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaturaCikisDuzenleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaturaCikisDuzenleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
