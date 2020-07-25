import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArkSessionsComponent } from './ark-sessions.component';

describe('ArkSessionsComponent', () => {
  let component: ArkSessionsComponent;
  let fixture: ComponentFixture<ArkSessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArkSessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArkSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
