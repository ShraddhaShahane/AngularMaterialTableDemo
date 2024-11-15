import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerTableComponent } from './inner-table.component';

describe('InnerTableComponent', () => {
  let component: InnerTableComponent;
  let fixture: ComponentFixture<InnerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InnerTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InnerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
