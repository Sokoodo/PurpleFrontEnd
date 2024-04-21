import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { SnackbarServiceService } from "../../services/snackbar-service.service"
import { ApiService } from '../../services/api-service.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-order-relation-page',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatSliderModule, MatButtonModule, CommonModule, FormsModule, MatProgressBarModule, MatGridListModule, HttpClientModule],
  templateUrl: './order-relation-page.component.html',
  styleUrl: './order-relation-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class OrderRelationPageComponent implements OnInit {

  private _cd = inject(ChangeDetectorRef);
  private _snackbarServiceService = inject(SnackbarServiceService);
  private _apiService = inject(ApiService);

  sliderValue: number;
  singleFile: File | null;

  generatedEventLog: any;

  constructor() {
    this.sliderValue = 0;
    this.singleFile = null;
  }

  ngOnInit(): void {
    setTimeout(() => this._cd.detectChanges(), 1);
  }

  onFileSelected(event: any): void {
    this.singleFile = event.target.files[0] ?? null;
  }

  formatLabel(value: number): string {
    if (value >= 1) {
      return Math.round(value / 1) + '%';
    }
    return `${value}`;
  }

  generateLog() {
    if (this.singleFile != null) {
      this._apiService.orderRelationGenerateEventLog(this.singleFile, this.sliderValue)
        .subscribe(res => {
          if (res != null)
            this.generatedEventLog = res;
          console.log(this.generatedEventLog)
        });
    } else {
      this._snackbarServiceService.openSnackBar("You first have to load a File", "close", { duration: 2500 });
    }
  }

  downloadLog() {
    if (this.singleFile != null) {
    } else {

      this._snackbarServiceService.openSnackBar("You first have to generate an eventLog", "close", { duration: 2500 });
    }
  }

}
