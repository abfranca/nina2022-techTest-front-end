import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboratorAddComponent } from './colaborator-add.component';

describe('ColaboratorAddComponent', () => {
  let component: ColaboratorAddComponent;
  let fixture: ComponentFixture<ColaboratorAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColaboratorAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaboratorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
