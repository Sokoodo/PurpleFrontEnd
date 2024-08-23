import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DndDirective } from '../../directives/dnd.directive';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { SnackbarServiceService } from "../../services/snackbar-service.service"
import { ApiService } from '../../services/api-service.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Subscription } from 'rxjs';
import { AlgorithmUtilsService } from '../../services/algorithm-utils.service';

@Component({
  selector: 'app-order-relation-page',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatCardModule, MatSliderModule, DndDirective,
    MatButtonModule, CommonModule, FormsModule, MatProgressBarModule, MatGridListModule, HttpClientModule],
  templateUrl: './order-relation-page.component.html',
  styleUrl: './order-relation-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class OrderRelationPageComponent implements OnInit, OnDestroy {
  private _cd = inject(ChangeDetectorRef);
  private _snackbarServiceService = inject(SnackbarServiceService);
  private _apiService = inject(ApiService);
  private _subs: Subscription[];

  aUtilsService = inject(AlgorithmUtilsService);
  sliderValue: number;
  singleFile: File | null;
  dataSource: CdkTableDataSourceInput<any>;

  constructor() {
    this.sliderValue = 0;
    this.singleFile = null;
    this.dataSource = [];
    this._subs = [];
  }

  ngOnInit(): void {
    setTimeout(() => this._cd.detectChanges(), 1);
  }

  ngOnDestroy(): void {
    this._subs.forEach(s => s.unsubscribe());
  }

  onFileSelected(event: any): void {
    this.singleFile = event.target.files[0] != undefined ? event.target.files[0] : null;
  }

  onFileDrop(event: any) {
    this.singleFile = event[0] != undefined && this.aUtilsService.isBpmnFile(event[0].name) ? event[0] : null;
  }

  generateLog() {
    if (this.singleFile != null) {
      this._subs.push(this._apiService.orderRelationGenerateEventLog(this.singleFile, this.sliderValue)
        .subscribe(res => {
          if (res != null) {
            console.log(res)
            const flattenedData = this.aUtilsService.flattenEventLog(res);
            this.dataSource = new MatTableDataSource(flattenedData);
            console.log(flattenedData);
            this.aUtilsService.openDialog(flattenedData);
          } else {
            console.error("Errore nel generatedEventLog");
          }
        }));
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
