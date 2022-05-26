import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './components/start-page/start-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ColaboratorsComponent } from './components/colaborators/colaborators.component';
import { ColaboratorDetailComponent } from './components/colaborator-detail/colaborator-detail.component';
import { ColaboratorAddComponent } from './components/colaborator-add/colaborator-add.component';
import { ColaboratorFavoritesComponent } from './components/colaborator-favorites/colaborator-favorites.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/colaborators', pathMatch: 'full' },
  { path: 'change', component: ChangePasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add', component: ColaboratorAddComponent },
  { path: 'favorites', component: ColaboratorFavoritesComponent },
  { path: 'detail/:id', component: ColaboratorDetailComponent },
  { path: 'colaborators', component: ColaboratorsComponent },
  { path: '**', redirectTo: '/start', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
