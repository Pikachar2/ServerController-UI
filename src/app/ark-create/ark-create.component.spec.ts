import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArkCreateComponent } from './ark-create.component';

describe('ArkCreateComponent', () => {
  let component: ArkCreateComponent;
  let fixture: ComponentFixture<ArkCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArkCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArkCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
