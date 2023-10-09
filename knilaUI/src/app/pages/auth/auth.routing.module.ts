import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from 'src/app/shared/pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: 'sign-in',component:LoginComponent,},
  { path: '',redirectTo:'sign-in',pathMatch:'full'},
  { path: '**',component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
