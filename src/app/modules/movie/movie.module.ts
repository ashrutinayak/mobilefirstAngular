import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from '../comman/shared.module';



@NgModule({
  declarations: [
    MovieComponent,

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
    // UserComponent,
  ]
})
export class MovieModule { }
