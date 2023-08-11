import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from "@angular/router";

import { MatButtonModule } from "@angular/material/button";

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {

}
