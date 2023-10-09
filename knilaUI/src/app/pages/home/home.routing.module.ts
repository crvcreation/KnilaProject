import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagenotfoundComponent } from 'src/app/shared/pagenotfound/pagenotfound.component';



const routes: Routes = [
  { path: 'dashboard',component:DashboardComponent},
  { path: '',redirectTo:'dashboard',pathMatch:'full'},
  { path: '**',component:PagenotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers:[],
  exports: [RouterModule]
})
export class HomeRoutingModule { }





