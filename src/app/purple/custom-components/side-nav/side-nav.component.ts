import { Component, ViewEncapsulation, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

export enum ModuleNames {
  TRACE_FREQUENCY = "trace-frequency",
  CUSTOM_NOISE = "custom-noise",
  ALIGNMENT_COST = "alignment-cost",
  ORDER_RELATION = "order-relation",
  HOME = "home"
}
@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatListModule, MatIconModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SideNavComponent {
  private _router = inject(Router);

  isExpanded: boolean;

  constructor() {
    this.isExpanded = true;
  }

  redirectHome() {
    this._router.navigateByUrl(ModuleNames.HOME);
  }

  redirectOrderRelations() {
    this._router.navigateByUrl(ModuleNames.ORDER_RELATION);
  }

  redirectAlignmentCost() {
    this._router.navigateByUrl(ModuleNames.ALIGNMENT_COST);
  }

  redirectCustomNoise() {
    this._router.navigateByUrl(ModuleNames.CUSTOM_NOISE);
  }

  redirectTracesFrequency() {
    this._router.navigateByUrl(ModuleNames.TRACE_FREQUENCY);
  }
}