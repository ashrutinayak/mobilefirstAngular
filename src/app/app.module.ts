import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './angular-material.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationDialogComponent } from './modules/comman/confirmation-dialog/confirmation-dialog.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { MovieModule } from './modules/movie/movie.module';
import { FavouriteModule } from './modules/favourite/favourite.module';
@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialogComponent,
    LoginComponent,
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
