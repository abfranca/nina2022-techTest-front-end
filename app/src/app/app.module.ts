import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ColaboratorsComponent } from './components/colaborators/colaborators.component';
import { ColaboratorDetailComponent } from './components/colaborator-detail/colaborator-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ColaboratorAddComponent } from './components/colaborator-add/colaborator-add.component';
import { ColaboratorFavoritesComponent } from './components/colaborator-favorites/colaborator-favorites.component';
import { LoginComponent } from './components/login/login.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { StartPageComponent } from './components/start-page/start-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ColaboratorsComponent,
    ColaboratorDetailComponent,
    DashboardComponent,
    ColaboratorAddComponent,
    ColaboratorFavoritesComponent,
    LoginComponent,
    ChangePasswordComponent,
    StartPageComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }