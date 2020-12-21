/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GirisCikislarComponent } from './GirisCikislar.component';

describe('GirisCikislarComponent', () => {
  let component: GirisCikislarComponent;
  let fixture: ComponentFixture<GirisCikislarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GirisCikislarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GirisCikislarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
