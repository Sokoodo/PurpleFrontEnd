import { Routes } from '@angular/router';
import { PurpleHomePageComponent } from './purple/purple-home-page/purple-home-page.component';
import { TracesFrequencyPageComponent } from './purple/algorithm-pages/traces-frequency-page/traces-frequency-page.component';
import { OrderRelationPageComponent } from './purple/algorithm-pages/order-relation-page/order-relation-page.component';
import { AlignmentCostComponent } from './purple/algorithm-pages/alignment-cost/alignment-cost.component';
import { CustomNoiseComponent } from './purple/algorithm-pages/custom-noise/custom-noise.component';

export const routes: Routes = [
    { path: 'home', component: PurpleHomePageComponent, title: "PURPLE- 2.0" },
    { path: 'orderRelation', component: OrderRelationPageComponent, title: "PURPLE- Order Relation" },
    { path: 'traceFrequency', component: TracesFrequencyPageComponent, title: "PURPLE- Trace Frequency" },
    { path: 'alignmentCost', component: AlignmentCostComponent, title: "PURPLE- Alignment Cost" },
    { path: 'customNoise', component: CustomNoiseComponent, title: "PURPLE- Custom Noise" },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: PurpleHomePageComponent }
];
