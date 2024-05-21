import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeButtonComponent } from './components/shared/theme-button/theme-button.component';
import { FormComponent } from './components/shared/form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { ConfirmationComponent } from './components/shared/confirmation/confirmation.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginFormComponent } from './components/shared/login-form/login-form.component';
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
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
