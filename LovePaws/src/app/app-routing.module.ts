import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ContactComponent } from './components/contact/contact.component';
import { ExplanationComponent } from './components/explanation/explanation.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HomeComponent } from './components/home/home.component';
const routes: Routes = [
  {
    path:'',
    redirectTo:'/home', // pagina que aparecera por defecto.
    pathMatch:'full'
  },
  { path: 'navbar',       component: NavBarComponent},
  { path: 'home',        component: HomeComponent},
  { path: 'login',        component: LoginComponent },
  { path: 'register',     component: RegisterComponent },
  { path: 'presentation', component: PresentationComponent },
  { path: 'contact',      component: ContactComponent },
  { path: 'explanation',  component: ExplanationComponent },
  { path: 'logout',       component: LogoutComponent },
  {path:'**',   component:PagenotfoundComponent // este path tiene que estar al final
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
