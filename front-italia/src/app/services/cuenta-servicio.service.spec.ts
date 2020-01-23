import { TestBed } from '@angular/core/testing';

import { CuentaServicioService } from './cuenta-servicio.service';

describe('CuentaServicioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CuentaServicioService = TestBed.get(CuentaServicioService);
    expect(service).toBeTruthy();
  });
});
