import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiConfig } from './api-config';

describe('ApiConfig', () => {
  let component: ApiConfig;
  let fixture: ComponentFixture<ApiConfig>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiConfig]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiConfig);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
