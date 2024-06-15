import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation, inject } from '@angular/core';
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
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EventLogDialogComponent } from '../../dialogs/app-event-log-dialog/app-event-log-dialog.component';

@Component({
  selector: 'app-order-relation-page',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatCardModule, MatSliderModule,
    MatButtonModule, CommonModule, FormsModule, MatProgressBarModule, MatGridListModule, HttpClientModule],
  templateUrl: './order-relation-page.component.html',
  styleUrl: './order-relation-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class OrderRelationPageComponent implements OnInit, OnDestroy {

  private _cd = inject(ChangeDetectorRef);
  private _snackbarServiceService = inject(SnackbarServiceService);
  private _apiService = inject(ApiService);
  dialog = inject(MatDialog);

  private _subs: Subscription[];
  sliderValue: number;
  singleFile: File | null;
  displayedColumns: string[] = ['caseId', 'eventName', 'timestamp', 'attributes'];
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
    this.singleFile = event.target.files[0] ?? null;
  }

  formatLabel(value: number): string {
    if (value >= 1) {
      return Math.round(value / 1) + '%';
    }
    return `${value}`;
  }

  flattenEventLog(eventLog: any): any[] {
    let flattened = [];
    let caseIdCounter = 1; // Counter for generating case IDs if they are not provided

    if (Array.isArray(eventLog)) {
      for (let trace of eventLog) {
        let caseId = trace.attributes['concept:name'] || `case_${caseIdCounter++}`;
        for (let event of trace.events) {
          flattened.push({
            caseId: caseId,
            eventName: event.attributes['concept:name'],
            timestamp: event.attributes['time:timestamp'],
            attributes: JSON.stringify(event.attributes)
          });
        }
      }
    }
    return flattened;
  }

  generateLog() {
    if (this.singleFile != null) {
      this._subs.push(this._apiService.orderRelationGenerateEventLog(this.singleFile, this.sliderValue)
        .subscribe(res => {
          if (res != null) {
            const flattenedData = this.flattenEventLog(res);
            this.dataSource = new MatTableDataSource(flattenedData);
            console.log(flattenedData);
            this.openDialog(flattenedData);
          } else {
            console.error("Errore nel generatedEventLog");
          }
        }));
    } else {
      this._snackbarServiceService.openSnackBar("You first have to load a File", "close", { duration: 2500 });
    }
  }

  openDialog(data: any): void {
    this.dialog.open(EventLogDialogComponent, {
      width: '80%',
      data: data
    });
  }

  downloadLog() {
    if (this.singleFile != null) {
    } else {

      this._snackbarServiceService.openSnackBar("You first have to generate an eventLog", "close", { duration: 2500 });
    }
  }

}
