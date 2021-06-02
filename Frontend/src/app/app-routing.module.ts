import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "./services/auth-guard.service";

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DemandesComponent } from './components/demandes/demandes.component';
import { OffresComponent } from './components/offres/offres.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "demandes", component: DemandesComponent },
  { path: "offres", component: OffresComponent , canActivate: [AuthGuard]  },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
