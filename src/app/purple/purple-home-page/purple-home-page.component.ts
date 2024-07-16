import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { SideNavComponent } from "../custom-components/side-nav/side-nav.component";
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from "../custom-components/toolbar/toolbar.component";

@Component({
  selector: 'purple-home-page',
  standalone: true,
  templateUrl: './purple-home-page.component.html',
  styleUrl: './purple-home-page.component.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [SideNavComponent, CommonModule, ToolbarComponent]
})
export class PurpleHomePageComponent implements OnInit {
  private _cd = inject(ChangeDetectorRef);

  // const formData: FormData = new FormData();
  // formData.append('file', file, 'filtered.csv');

  // public createGraph(formData: FormData, filteredColumn: string[], valuesColumn: string[]): Observable<any> {

  //   formData.append('filteredColumn', JSON.stringify(filteredColumn));
  //   formData.append('valuesColumn', JSON.stringify(valuesColumn));
  //   return this.httpClient.post('http://127.0.0.1:8080/api/v1/graph', formData);

  // }
  
  ngOnInit(): void {
    setTimeout(() => this._cd.detectChanges(), 1);
  }
}
