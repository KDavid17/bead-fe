import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  imports: [
    NgOptimizedImage
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {

}
