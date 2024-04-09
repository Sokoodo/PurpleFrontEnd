import { Component, ViewEncapsulation, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

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
    this._router.navigateByUrl("home");
  }

  redirectOrderRelations() {
    this._router.navigateByUrl("orderRelation");
  }

  redirectAlignmentCost() {
    this._router.navigateByUrl("alignmentCost");
  }

  redirectCustomNoise() {
    this._router.navigateByUrl("customNoise");
  }

  redirectTracesFrequency() {
    this._router.navigateByUrl("traceFrequency");
  }
}
