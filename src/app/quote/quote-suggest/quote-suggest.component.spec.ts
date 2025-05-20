import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteSuggestComponent } from './quote-suggest.component';

describe('QuoteSuggestComponent', () => {
  let component: QuoteSuggestComponent;
  let fixture: ComponentFixture<QuoteSuggestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteSuggestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteSuggestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
