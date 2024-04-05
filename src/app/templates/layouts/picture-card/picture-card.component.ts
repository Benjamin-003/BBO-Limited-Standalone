import { Component, Input} from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'ltd-picture-card',
    templateUrl: './picture-card.component.html',
    styles: [],
    standalone: true,
    imports: [NgIf]
})
export class PictureCardComponent{
  @Input() item?: string;
  @Input() imageURL?: string;
}
