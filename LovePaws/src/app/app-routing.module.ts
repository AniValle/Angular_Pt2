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
import { ResidentsComponent } from './components/residents/residents.component';
import { UsersComponent } from './components/users/users.component';
import { RoutingGuard } from './guards/routing.guard';
import { FormAnimalsComponent } from './components/form-animals/form-animals.component';
import { AnimalDetailComponent } from './components/animal-detail/animal-detail.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/home', 
    pathMatch:'full'
  },
  { path: 'navbar',       component: NavBarComponent},
  { path: 'home',         component: HomeComponent},
  { path: 'login',        component: LoginComponent },
  { path: 'register',     component: RegisterComponent },
  { path: 'presentation', component: PresentationComponent },
  { path: 'contact',      component: ContactComponent },
  { path: 'explanation',  component: ExplanationComponent },
  { path: 'residents',    component: ResidentsComponent, canActivate: [RoutingGuard]},
  { path: 'formAnimals',  component: FormAnimalsComponent, canActivate: [RoutingGuard]},
  { path: 'edit-animal', component: AnimalDetailComponent, canActivate: [RoutingGuard]},
  { path: 'users',        component: UsersComponent, canActivate: [RoutingGuard] },
  { path: 'logout',       component: LogoutComponent },
  { path: '**',           component:PagenotfoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
