import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, throwError, of } from "rxjs";
import { switchMap, filter, take, tap } from 'rxjs/operators';
import { CAuthService } from "../services/auth.service";
import { CAjaxservice } from "../services/ajax.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private tokenRefreshedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private api: CAjaxservice, private auth: CAuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.auth.GetToken();
    const isAnonymous = req.headers.has('allow-anonymous');
    let authReq: HttpRequest<any>;

    if (isAnonymous) {
      authReq = req.clone({
        headers: req.headers.delete('Authorization')
      });
    } else {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });
    }

    // Show loader
    this.showLoader();

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse): Observable<HttpEvent<any>> => {
        // Hide loader in error case
        this.hideLoader();

        if (error.status === 401) {
          if (!this.refreshTokenInProgress) {
            this.refreshTokenInProgress = true;
            // send refresh token request

            const _token = JSON.parse(localStorage.getItem("token") + "");
            return this.api.postDataAnonymous('contacts/refresh-token', _token).pipe(
              switchMap((response: any) => {
                this.refreshTokenInProgress = false;
                this.auth.SetToken(response);
                const clonedReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${response.token}`
                  }
                });
                console.clear();
                return next.handle(clonedReq);
              }),
              catchError((error: any) => {
                this.refreshTokenInProgress = false;
                this.auth.logout();
                return throwError('');
              })
            );
          } else {
            // If refreshTokenInProgress is true, wait for the token refresh and retry the request
            return this.tokenRefreshedSubject.pipe(
              filter((refreshed: boolean) => refreshed),
              take(1),
              switchMap(() => next.handle(authReq))
            );
          }
        } 
        else if (error.status == 400) {
          if (error.error && error.error.errors && error.error.title!="") {
            // Validation error
            const validationErrors = Object.values<string[]>(error.error.errors);
            const errorMessages = validationErrors.reduce((acc: string[], curr: string[]) => {
              return acc.concat(curr);
            }, []);
            alert(errorMessages.join());
          } 
          else if(error.error.ErrorMessage){
            alert(error.error.ErrorMessage);
          }
          else {
            // Other error
            alert('An error occurred. Please try again later.');
          }
          // Return a dummy response to continue the observable chain
          return throwError('');
        } else {
          return throwError(error);
        }
      }),
      tap((event: HttpEvent<any>) => {
        // Hide loader on success
        this.hideLoader();
      })
    );
  }

  private showLoader(): void {
    // Show loader logic here
  }

  private hideLoader(): void {
    // Hide loader logic here
  }
  
  // Rest of the code...
}
