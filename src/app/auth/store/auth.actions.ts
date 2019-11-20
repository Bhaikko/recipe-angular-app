import { Action } from '@ngrx/store';

export const LOGIN_START = "LOGIN_START";
export const AUTHENTICATE_SUCCESS = "AUTHENTICATE";
export const AUTHENTICATE_FAIL = "AUTHENTICATE_FAIL";
export const LOGOUT = "LOGOUT";
export const SIGNUP_START = "SIGHUP_START";
export const CLEAR_ERROR = "CLEAR_ERROR";

export class AuthenticateSuccess implements Action {
    readonly type = AUTHENTICATE_SUCCESS;

    constructor (public payload: {
        email: string,
        userId: string,
        token: string,
        expirationDate: Date 
    }) {

    }
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;

    constructor (public payload: {
        email: string,
        password: string 
    }) {

    }
}

export class AuthenticateFail implements Action {
    readonly type = AUTHENTICATE_FAIL;

    constructor (public payload: string) {

    }
}

export class SignupStart implements Action {
    readonly type = SIGNUP_START;

    constructor (public payload: {
        email: string,
        password: string 
    }) {

    }
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;

}

export type AuthActions = AuthenticateFail | Logout | LoginStart | AuthenticateSuccess | SignupStart | ClearError;