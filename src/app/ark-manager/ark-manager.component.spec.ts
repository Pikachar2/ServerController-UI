import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArkManagerComponent } from './ark-manager.component';

describe('ArkManagerComponent', () => {
  let component: ArkManagerComponent;
  let fixture: ComponentFixture<ArkManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArkManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArkManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
