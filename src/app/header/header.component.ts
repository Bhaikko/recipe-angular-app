import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from './../store/app.reducer';
import * as AuthActions from './../auth/store/auth.actions';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {

    private userSub: Subscription;
    isAuthenticated = false;

    constructor (private dataStorageService: DataStorageService, private authService: AuthService, private store: Store<fromApp.AppState>) {

    }

    ngOnInit () {
        // this.userSub = this.authService.user.subscribe(user => {
        this.userSub = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
            this.isAuthenticated = !!user;
        });
    }

    ngOnDestroy () {
        this.userSub.unsubscribe();
    }

    onSaveData () {
        this.dataStorageService.storeRecipes();
    }

    onFetchData () {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout () {
        this.store.dispatch(new AuthActions.Logout());
        // this.authService.logout();
    }
}