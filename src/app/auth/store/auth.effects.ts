import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { HttpClient } from '@angular/common/http';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// interfaces are used to define the output datatype of a function rather than typing it along the function
export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    kind: string,
    registered?: boolean;
}

const handlerAuthentication = (expiresIn: number, email: string, userId: string, token: string) => {
    // map automatically returns an observable hence of() is not required
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    return new AuthActions.AuthenticateSuccess({
        email: email,
        userId: userId,
        token: token,
        expirationDate: expirationDate
    });
}

const handlerError = (errorRes: any) => {

    let errorMessage = "An unknown error occured";

    if (!errorRes.error || !errorRes.error.error) {
        return of(new AuthActions.AuthenticateFail(errorMessage));
    }
    switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMessage = "This email exists already";
            break;
        case "EMAIL_NOT_FOUND":
            errorMessage = "Email or password incorrect";
            break;
        case "INVALID_PASSWORD":
            errorMessage = "Email or password incorrect"
    }
    return of(new AuthActions.AuthenticateFail(errorMessage));
}

@Injectable()
export class AuthEffects {
    // sideeffects are operations that might not effect state
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAeNuvIokn2RqAz_di2bPEHvXfvMchanIQ", {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
            }).pipe(
                map(resData => {
                    return handlerAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
                }),
                catchError(errorRes => {
                    return handlerError(errorRes);
                })
            );
        }),
    );

    @Effect({ dispatch: false })
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT),
        tap(() => {
            this.router.navigate(['/']);
        })
    );


    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
            return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAeNuvIokn2RqAz_di2bPEHvXfvMchanIQ", {
                email: signupAction.payload.email,
                password: signupAction.payload.password,
                returnSecureToken: true
            }).pipe(
                map(resData => {
                    return handlerAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
                }),
                catchError(errorRes => {
                    return handlerError(errorRes);
                })
            );
        })
    )

    constructor (private actions$: Actions, private http: HttpClient, private router: Router) {

    }
}