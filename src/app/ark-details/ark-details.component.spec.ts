import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArkDetailsComponent } from './ark-details.component';

describe('ArkDetailsComponent', () => {
  let component: ArkDetailsComponent;
  let fixture: ComponentFixture<ArkDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArkDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArkDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
