import { TestBed } from '@angular/core/testing';

import { ArkService } from './ark.service';

describe('ArkService', () => {
  let service: ArkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
