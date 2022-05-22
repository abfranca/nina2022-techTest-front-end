import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboratorDetailComponent } from './colaborator-detail.component';

describe('ColaboratorDetailComponent', () => {
  let component: ColaboratorDetailComponent;
  let fixture: ComponentFixture<ColaboratorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColaboratorDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaboratorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
