import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
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

@Injectable({
    providedIn: "root"
})
export class AuthService {
    user = new BehaviorSubject<User>(null); // subjects can be used to "reactively" update UI

    constructor (private http: HttpClient, private router: Router) {

    }

    signup (email: string, password: string) {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAeNuvIokn2RqAz_di2bPEHvXfvMchanIQ", {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)));
    }

    login (email: string, password: string) {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAeNuvIokn2RqAz_di2bPEHvXfvMchanIQ", {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)));
    }

    // common error handling for both login and signup
    private handleError(errorRes: HttpErrorResponse) {
        // this returns an observable having error
        let errorMessage = "An unknown error occured";

        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
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

        return throwError(errorMessage);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
    }

    logout () {
        this.user.next(null);
        this.router.navigate(['/auth']);
    }
}