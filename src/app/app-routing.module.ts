import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { AuthGuard } from './modules/auth/service/auth.guard';
import { MovieComponent } from './modules/movie/movie.component';
import { FavouriteComponent } from './modules/favourite/favourite.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, title: 'Login'},
  { path: 'movie',  canActivate: [AuthGuard], component: MovieComponent, title: 'Movie'},
  { path: 'favourite', canActivate: [AuthGuard], component: FavouriteComponent, title: 'Favourite'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
