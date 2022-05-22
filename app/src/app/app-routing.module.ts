import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './components/start-page/start-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ColaboratorsComponent } from './components/colaborators/colaborators.component';
import { ColaboratorDetailComponent } from './components/colaborator-detail/colaborator-detail.component';
import { ColaboratorAddComponent } from './components/colaborator-add/colaborator-add.component';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: StartPageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'colaborators', component: ColaboratorsComponent },
  { path: 'detail/:id', component: ColaboratorDetailComponent },
  { path: 'add', component: ColaboratorAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
