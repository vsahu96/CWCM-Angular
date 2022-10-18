import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BulkRegistrationComponent } from './auth/bulk-registration/bulk-registration.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'bulk-registeration', component: BulkRegistrationComponent },
  { path: 'login', component: LoginComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
