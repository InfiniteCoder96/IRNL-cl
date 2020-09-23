import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearcgBannerComponent } from './searcg-banner.component';

describe('SearcgBannerComponent', () => {
  let component: SearcgBannerComponent;
  let fixture: ComponentFixture<SearcgBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearcgBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearcgBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
