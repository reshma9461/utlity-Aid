import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvoidpropertyComponent } from './addvoidproperty.component';

describe('AddvoidpropertyComponent', () => {
  let component: AddvoidpropertyComponent;
  let fixture: ComponentFixture<AddvoidpropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddvoidpropertyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddvoidpropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
