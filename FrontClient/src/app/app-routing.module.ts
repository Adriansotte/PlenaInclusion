import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { AllSchedulesComponent } from './components/shared/all-schedules/all-schedules.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    canActivate: [loginGuard]
  },
  {
    path: "register",
    component: RegisterPageComponent
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [authGuard]
  },
  { path: "listSchedules", component: AllSchedulesComponent },
  {
    path: "**",
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
