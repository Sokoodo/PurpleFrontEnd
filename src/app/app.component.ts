import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DefaultPageComponent } from './purple/modules/default-page/default-page.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, DefaultPageComponent]
})
export class AppComponent {
  title = 'PurpleFrontEnd';
}
