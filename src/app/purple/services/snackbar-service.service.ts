import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarServiceService {

  private _snackbarService = inject(MatSnackBar);

  constructor() { }

  openSnackBar(message: string, action: string, config: MatSnackBarConfig<any> | undefined) {
    this._snackbarService.open(message, action, config);
  }

}
