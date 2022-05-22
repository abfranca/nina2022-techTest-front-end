import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboratorFavoritesComponent } from './colaborator-favorites.component';

describe('ColaboratorFavoritesComponent', () => {
  let component: ColaboratorFavoritesComponent;
  let fixture: ComponentFixture<ColaboratorFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColaboratorFavoritesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaboratorFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
