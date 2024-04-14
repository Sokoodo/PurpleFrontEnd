import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from "./purple/side-nav/side-nav.component";
import { ToolbarComponent } from "./purple/toolbar/toolbar.component";
import { DefaultPageComponent } from './purple/modules/default-page/default-page.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, SideNavComponent, ToolbarComponent, DefaultPageComponent]
})
export class AppComponent {
  title = 'PurpleFrontEnd';
}
