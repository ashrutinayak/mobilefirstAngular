import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { AngularMaterialModule } from '../../../app/angular-material.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [AngularMaterialModule],
  exports: [HeaderComponent]
})
export class SharedModule {}