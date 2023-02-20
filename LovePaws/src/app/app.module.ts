import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';//per ngModel
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExplanationComponent } from './components/explanation/explanation.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HomeComponent } from './components/home/home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { ResidentsComponent } from './components/residents/residents.component';
import { UsersComponent } from './components/users/users.component';
import { RepitePassDirective } from './directives/repite-pass.directive';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormAnimalsComponent } from './components/form-animals/form-animals.component';
import { AnimalpipesPipe } from './pipes/animalpipes.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ExplanationComponent,
    PresentationComponent,
    ContactComponent,
    LoginComponent,
    PagenotfoundComponent,
    NavBarComponent,
    RegisterComponent,
    LogoutComponent,
    HomeComponent,
    ResidentsComponent,
    UsersComponent,
    RepitePassDirective,
    FormAnimalsComponent,
    AnimalpipesPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MdbCarouselModule,
    FormsModule, //per ngModel
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
