import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCustomersComponent } from './search-customers.component';

describe('SearchCustomersComponent', () => {
  let component: SearchCustomersComponent;
  let fixture: ComponentFixture<SearchCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCustomersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
