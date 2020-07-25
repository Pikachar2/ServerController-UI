import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArkCoreComponent } from './ark-core.component';

describe('ArkCoreComponent', () => {
  let component: ArkCoreComponent;
  let fixture: ComponentFixture<ArkCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArkCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArkCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
