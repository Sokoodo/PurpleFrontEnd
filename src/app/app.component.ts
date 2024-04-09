import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from "./purple/toolbar/toolbar.component";
import { SideNavComponent } from "./purple/side-nav/side-nav.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, ToolbarComponent, SideNavComponent]
})
export class AppComponent {
  title = 'PurpleFrontEnd';
}
