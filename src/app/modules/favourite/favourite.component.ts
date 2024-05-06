import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent, ConfirmDialogModel } from '../comman/confirmation-dialog/confirmation-dialog.component';
import { FavouriteService } from './service/favourite.service';
import { first } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent {
  result: string = '';
  dataList = new MatTableDataSource();
  displayedColumns = [
    'id',
    'movieTitle',
    'userName',
    'action',
  ];
  constructor(private favouriteService: FavouriteService,private dialog: MatDialog, private snackBar: MatSnackBar, private router: Router) {}
  ngOnInit(): void {
    this.getFavouriteList();
  }
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataList.paginator = this.paginator;
  }
  getFavouriteList(){
    this.favouriteService
      .getfavourite(this.paginator.pageSize, this.paginator.pageIndex)
      .pipe(first())
      .subscribe((favourite: any) => {
        if (favourite) {
          this.snackBar.open(favourite.message, '', {
            duration: 1000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
          this.router.navigate(['favourite']);
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
  openDialog(id: number) {
    const message = `Are you sure you want to unfavourite this?`;

    const dialogData = new ConfirmDialogModel("UnFavourite Action", message);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if(this.result){
        this.favouriteService
        .unfavourite(id)
        .pipe(first())
        .subscribe((unfavourite: any) => {
          debugger
          if (unfavourite) {
            this.snackBar.open('Login Successful.', '', {
              duration: 1000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });
            this.router.navigate(['favurite']);
          }
          if(unfavourite.message){
            this.snackBar.open(unfavourite.message, '', {
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
