import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent, ConfirmDialogModel } from '../comman/confirmation-dialog/confirmation-dialog.component';
import { MovieService } from './service/movie.service';
import { first } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent {
  result: string = '';
  dataList = new MatTableDataSource();
  displayedColumns = [
    'Title',
    'Year',
    'imdbID',
    'Type',
    'Poster',
    'Action'
  ];
  constructor( private movieService: MovieService, private snackBar: MatSnackBar, private router: Router,private dialog: MatDialog) {}
  ngOnInit(): void {
    this.getMovie();
  }
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataList.paginator = this.paginator;
  }
  getMovie(){
    this.movieService
      .getMovie(this.paginator.pageSize, this.paginator.pageIndex)
      .pipe(first())
      .subscribe((movie: any) => {
        debugger
        if (movie) {
          this.snackBar.open('Login Successful.', '', {
            duration: 1000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
          this.router.navigate(['movie']);
        }
        if(movie.message){
          this.snackBar.open(movie.message, '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        }
        else {
          this.snackBar.open('Something was wrong.', '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        }
      })
  }
  openDialog(title: string) {
    const message = `Are you sure you want to favourite this?`;

    const dialogData = new ConfirmDialogModel("Favourite Action", message);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if(this.result){
        this.movieService
        .favourite(title)
        .pipe(first())
        .subscribe((favourite: any) => {
          if (favourite) {
            this.snackBar.open(favourite.message, '', {
              duration: 1000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });
            this.router.navigate(['favurite']);
          }
          if(favourite.message){
            this.snackBar.open(favourite.message, '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });
          }
          else {
            this.snackBar.open('Something was wrong.', '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });
          }
        })
      }
    });
  }
}
