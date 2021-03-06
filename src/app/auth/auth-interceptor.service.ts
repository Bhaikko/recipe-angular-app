import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from './../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    // Interceptors are added to run common code before sending requrests
    constructor (private authService: AuthService, private store: Store<fromApp.AppState>) {

    }
    intercept (req: HttpRequest<any>, next: HttpHandler) {
        // return this.authService.user.pipe(
        return this.store.select('auth').pipe(
            take(1), 
            map(authState => {
                return authState.user;
            }),
            exhaustMap(user => {
                if (!user) {
                    return next.handle(req);
                }
                const modifiedRequest = req.clone({ 
                    params: new HttpParams().set('auth', user.token) 
                });
                return next.handle(modifiedRequest);
            }));
    }
}