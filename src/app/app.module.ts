import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';


// Services
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

import { appReducer } from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';

@NgModule({
  // declarations contains all the components, directives and custom pipes
  declarations: [
    AppComponent,
    HeaderComponent
  ],

  // imports contains all modules that this modules requires
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects]),
    // RecipesModule, // not to include when lazy loading
    // ShoppingListModule,
    SharedModule,
    CoreModule,
    // AuthModule
  ],

  // providers include all the services. Unlike modules specified in imports, servies are not needed to define in every separate module
  providers: [

  ],

  // component loaded in html file by angular
  bootstrap: [AppComponent],
  
  // exports is added so that the components added to this module can be used in the module this module will be included in
  exports: [

  ]
})
export class AppModule { }
