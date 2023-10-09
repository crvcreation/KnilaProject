import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { AnonymousGuard, AuthGuard } from './guards/auth.guard';
import { DefaultComponent } from './shared/default/default.component';

const routes: Routes = [
  { 
    path: 'auth', canActivate: [AnonymousGuard], loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  { 
    path: 'home',canActivate: [AuthGuard],
    component:DefaultComponent,  
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) 
  },
  {path:'',redirectTo:'auth',pathMatch:'full'},
  {path:'**',component:PagenotfoundComponent}
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  
  
  