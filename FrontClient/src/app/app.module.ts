import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeButtonComponent } from './components/shared/theme-button/theme-button.component';
import { FormComponent } from './components/shared/form/form.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { ConfirmationComponent } from './components/shared/confirmation/confirmation.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginFormComponent } from './components/shared/login-form/login-form.component';
import { AllSchedulesComponent } from './components/shared/all-schedules/all-schedules.component';
import { TokenAuthInterceptor } from './interceptors/tokenAuth/token-auth.interceptor';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ScheduleCardComponent } from './components/shared/schedule-card/schedule-card.component';


@NgModule({
  declarations: [
    AppComponent,
    ThemeButtonComponent,
    FormComponent,
    RegisterPageComponent,
    ConfirmationComponent,
    NotFoundComponent,
    LoginComponent,
    HomeComponent,
    LoginFormComponent,
    AllSchedulesComponent,
    HeaderComponent,
    FooterComponent,
    ScheduleCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenAuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
