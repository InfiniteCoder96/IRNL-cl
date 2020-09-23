import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationRetrievalComponent } from './information-retrieval.component';

describe('InformationRetrievalComponent', () => {
  let component: InformationRetrievalComponent;
  let fixture: ComponentFixture<InformationRetrievalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationRetrievalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationRetrievalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
