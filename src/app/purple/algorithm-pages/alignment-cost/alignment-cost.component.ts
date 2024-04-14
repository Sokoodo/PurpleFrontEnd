import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-alignment-cost',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatSliderModule, MatButtonModule, CommonModule, FormsModule, MatProgressBarModule],
  templateUrl: './alignment-cost.component.html',
  styleUrl: './alignment-cost.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AlignmentCostComponent implements OnInit {
  sliderValue: number;
  singleFile: File | null;
  private _cd = inject(ChangeDetectorRef);

  constructor() {
    this.sliderValue = 0;
    this.singleFile = null
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
}
