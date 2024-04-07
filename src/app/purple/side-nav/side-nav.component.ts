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
  
  redirectCustomNoise() {
  throw new Error('Method not implemented.');
  }
  redirectTracesFrequency() {
  throw new Error('Method not implemented.');
  }
  redirectOrderRelations() {
  throw new Error('Method not implemented.');
  }
}
