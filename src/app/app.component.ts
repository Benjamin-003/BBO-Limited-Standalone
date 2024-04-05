import { Component } from '@angular/core';
import { MasterPageComponent } from './templates/layouts/master-page/master-page.component';

@Component({
    selector: 'ltd-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [MasterPageComponent]
})
export class AppComponent {
  title = 'BBO-Ltd';
}
