import { TestBed } from '@angular/core/testing';

import { NaceConnectorService } from './nace-connector.service';

describe('NaceConnectorService', () => {
  let service: NaceConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NaceConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
