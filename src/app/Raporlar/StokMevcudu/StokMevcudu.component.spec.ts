/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StokMevcuduComponent } from './StokMevcudu.component';

describe('StokMevcuduComponent', () => {
  let component: StokMevcuduComponent;
  let fixture: ComponentFixture<StokMevcuduComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StokMevcuduComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StokMevcuduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
