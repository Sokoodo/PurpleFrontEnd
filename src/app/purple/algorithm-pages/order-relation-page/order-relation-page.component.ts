import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@Component({
  selector: 'app-order-relation-page',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatSliderModule, MatButtonModule, CommonModule, FormsModule, MatProgressBarModule],
  templateUrl: './order-relation-page.component.html',
  styleUrl: './order-relation-page.component.scss'
})
export class OrderRelationPageComponent {

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
