import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouriteComponent } from './favourite.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../comman/shared.module';
@NgModule({
  declarations: [
    FavouriteComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    SharedModule
  ],
  exports:[
    // HeaderComponent,
    ]
    // AddUserComponent]
})
export class FavouriteModule { }