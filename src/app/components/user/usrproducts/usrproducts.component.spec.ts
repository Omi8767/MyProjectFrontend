import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsrproductsComponent } from './usrproducts.component';

describe('UsrproductsComponent', () => {
  let component: UsrproductsComponent;
  let fixture: ComponentFixture<UsrproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsrproductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsrproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
