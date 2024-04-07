import { Routes } from '@angular/router';
import { PurpleHomePageComponent } from './purple/purple-home-page/purple-home-page.component';

export const routes: Routes = [
    { path: 'home', component: PurpleHomePageComponent, title: "PURPLE 2.0" },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: PurpleHomePageComponent }
];
