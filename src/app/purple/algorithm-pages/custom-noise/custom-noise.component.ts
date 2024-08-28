import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { AlgorithmUtilsService } from '../../services/algorithm-utils.service';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { SnackbarServiceService } from '../../services/snackbar-service.service';

@Component({
  selector: 'app-custom-noise',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatSliderModule, MatButtonModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './custom-noise.component.html',
  styleUrl: './custom-noise.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CustomNoiseComponent implements OnInit {
  private _cd = inject(ChangeDetectorRef);
  private _apiService = inject(ApiService);
  private _snackbarServiceService = inject(SnackbarServiceService);
  private _subs: Subscription[];

  aUtilsService = inject(AlgorithmUtilsService);
  missingHead: number;
  missingTail: number;
  missingEpisode: number;
  orderPerturbation: number;
  alienActivities: number;
  tracesNr: number;
  singleFile: File | null;
  dataSource: CdkTableDataSourceInput<any>;

  constructor() {
    this.missingHead = 0;
    this.tracesNr = 0;
    this.missingTail = 0;
    this.missingEpisode = 0;
    this.orderPerturbation = 0;
    this.alienActivities = 0;
    this.singleFile = null;
    this._subs = [];
    this.dataSource = [];
  }

  ngOnInit(): void {
    setTimeout(() => this._cd.detectChanges(), 1);
  }

  onFileSelected(event: any): void {
    this.singleFile = event.target.files[0] ?? null;
  }

  onFileDrop(event: any) {
    this.singleFile = event[0] != undefined && this.aUtilsService.isBpmnFile(event[0].name) ? event[0] : null;
  }

  formatLabel(value: number): string {
    if (value >= 1) {
      return Math.round(value / 1) + '%';
    }
    return `${value}`;
  }

  generateLog() {
    const noiseSum: number = Number(this.missingHead) + Number(this.missingTail) + Number(this.missingEpisode) + Number(this.alienActivities) + Number(this.orderPerturbation);
    if (noiseSum <= 100 && noiseSum >= 0) {
      if (this.singleFile != null) {
        this._subs.push(this._apiService.customNoiseGenerateEventLog(this.singleFile, this.missingHead, this.missingTail, this.missingEpisode, this.orderPerturbation, this.alienActivities, this.tracesNr)
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
    } else {
      this._snackbarServiceService.openSnackBar("The sum of the noises must be a number from 0 to 100!", "close", { duration: 2500 });
    }
  }

  downloadLog() {
    if (this.singleFile != null) {
    } else {
      this._snackbarServiceService.openSnackBar("You first have to generate an eventLog", "close", { duration: 2500 });
    }
  }
}
