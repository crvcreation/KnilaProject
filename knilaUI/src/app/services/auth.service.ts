import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  CanActivate, Router, UrlTree} from '@angular/router';
import { finalize } from 'rxjs';
import { CAjaxservice } from './ajax.service';

@Injectable({
  providedIn: 'root'
})

export class CAuthService {
  constructor(private router: Router,private api:CAjaxservice,private route: ActivatedRoute) { }

  login(Credential:any){
    this.api.postDataAnonymous('Contacts/login', Credential).subscribe((response:any)=>{
      this.SetToken(response);
      const returnUrl = this.route.snapshot.queryParams['url'] || '/home';
      this.router.navigateByUrl(returnUrl);
    })
    }
  isLoggedIn():boolean{
    return localStorage.getItem("token")!=null
  }

  checkLogin(url: string,isAnanymous:boolean): boolean | UrlTree{
    let loggedIn=this.isLoggedIn();

    if(!isAnanymous && !loggedIn) return this.router.createUrlTree(['/auth/sign-in'], { queryParams: { url } });
    else if(isAnanymous && loggedIn) return this.router.createUrlTree(['/home'], {});
    else return isAnanymous? !loggedIn:loggedIn;
} 

  logout(){
    this.api.postData('Contacts/logout').pipe(
      finalize(() => {
        this.router.navigate(['/auth/sign-in']);
        this.ClearLocalStorage();
      })
    ).subscribe();
  }

  GetToken(){
    var token=localStorage.getItem('token');
    return (token)? JSON.parse(token).token:"";
  }
  SetToken(token:any){
    localStorage.setItem('token', JSON.stringify(token))
  }
  ClearLocalStorage(){
     localStorage.removeItem('token');
  }
}

