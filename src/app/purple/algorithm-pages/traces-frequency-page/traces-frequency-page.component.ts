import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-traces-frequency-page',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatSliderModule, MatButtonModule, CommonModule, FormsModule, MatProgressBarModule],
  templateUrl: './traces-frequency-page.component.html',
  styleUrl: './traces-frequency-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TracesFrequencyPageComponent {
  sliderValue: number;
  singleFile: File | null;

  constructor() {
    this.sliderValue = 0;
    this.singleFile = null
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
