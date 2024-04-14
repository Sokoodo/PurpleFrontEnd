import { Component } from '@angular/core';
import { SideNavComponent } from "../../side-nav/side-nav.component";
import { ToolbarComponent } from "../../toolbar/toolbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-default-page',
    standalone: true,
    templateUrl: './default-page.component.html',
    styleUrl: './default-page.component.scss',
    imports: [SideNavComponent, ToolbarComponent, RouterOutlet]
})
export class DefaultPageComponent {

}
