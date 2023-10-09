// import { Injectable } from '@angular/core';

// export function CurrentUserServiceFactory() {
//   return new CurrentUserService();
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class CurrentUserService {
//   private userId: string="";
//   private userName: string="";
//   private userRole: string="";
//   private isAuthendicated: boolean=false;


//   setUserData(userId: string, userName: string, userRole: string): void {
//     this.userId = userId;
//     this.userName = userName;
//     this.userRole = userRole;
//   }

//   setLoggedIn(islogIn:boolean=false){
//     this.isAuthendicated=islogIn;
//   }
//   getUserId(): string {
//     return this.userId;
//   }

//   getUserName(): string {
//     return this.userName;
//   }

//   getUserRole(): string {
//     return this.userRole;
//   }
//   getIsAuthdicated():boolean{
//     return localStorage.getItem("token")!=null;
//     // return this.isAuthendicated;
//   }

// }
